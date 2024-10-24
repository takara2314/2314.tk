import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import sendMail from '../services/sendMail';
import ContactProps from '../models/ContactProps';
import SendMailPost from '../models/SendMailPost';

const Contact = (props: ContactProps) => {
  // お問い合わせの過程
  const [nowSection, setNowSection] = useState<string>('form');

  // 最初にページタイトルを「お問い合わせ」にする
  useEffect(() => {
    document.title = 'お問い合わせ - たからーん';
  }, []);

  return (
    <>
      {nowSection === 'form'
        ? <FormSection
            {...props}
            setNowSection={setNowSection}
          />
        : <></>
      }
      {nowSection === 'confirm'
        ? <ConfirmSection
            {...props}
            setNowSection={setNowSection}
          />
        : <></>
      }
      {nowSection === 'wait'
        ? <WaitSection
            {...props}
            setNowSection={setNowSection}
          />
        : <></>
      }
      {nowSection === 'success'
        ? <SuccessSection
            {...props}
            setNowSection={setNowSection}
          />
        : <></>
      }
      {nowSection === 'error'
        ? <ErrorSection
            {...props}
            setNowSection={setNowSection}
          />
        : <></>
      }
    </>
  );
}

// 内容入力過程
const FormSection = (props: ContactProps & {setNowSection: (nowSection: string) => void}) => {
  const nameObject: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const emailObject: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const messageObject: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null);

  // 電子メールアドレスの正規表現
  const emailRegExp: RegExp = new RegExp(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/);

  // コンポーネットを呼び出したときに、フォームに何か入力されている状態なら値チェック
  useEffect(() => {
    nameObject.current!.value = props.name;
    emailObject.current!.value = props.email;
    messageObject.current!.value = props.message;

    if (props.name !== '') {
      nameCheck(props.name);
    }
    if (props.email !== '') {
      emailCheck(props.email);
    }
    if (props.message !== '') {
      messageCheck(props.message);
    }
  }, []);

  // フォームの内容が変更されたときに、リアルタイムで適切がどうかをチェック
  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    nameCheck(e.target.value);
  }
  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    emailCheck(e.target.value);
  }
  const messageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    messageCheck(e.target.value);
  }

  // 次に進むボタンの処理
  const toConfirmButtonHandler = () => {
    // メッセージの文末に改行コードが含まれていたら、取り除いて格納
    props.setMessage(props.message.replace(/\n+$/g, ''))
    props.setNowSection('confirm');
  }

  // 入力された名前が空白であれば、エラーを発生
  const nameCheck = (value: string): void => {
    if (value === '') {
      props.setName('');
      props.setIsNameError(true);
    } else {
      props.setName(value);
      props.setIsNameError(false);
    }
  }

  // 入力されたメアドが空白もしくは不適切であれば、エラーを発生
  // 不適切な例: 正しいメアドの形ではない
  const emailCheck = (value: string): void => {
    if (value.match(emailRegExp)) {
      props.setEmail(value);
      props.setIsEmailError(false);
    } else {
      props.setEmail(value);
      props.setIsEmailError(true);
    }
  }

  // 入力された内容が空白もしくは改行だけであれば、エラーを発生
  const messageCheck = (value: string): void => {
    if (value.replace(/\n+$/g, '') === '') {
      props.setMessage('');
      props.setIsTextAreaError(true);
    } else {
      props.setMessage(value);
      props.setIsTextAreaError(false);
    }
  }

  // エラーに沿って送信ボタンを表示させるかを決める処理
  useEffect(() => {
    // 送信ボタンを表示する条件
    // ・名前が空白ではない
    // ・メールアドレスが正規表現通り
    // ・メッセージは文末の改行コードを除いたとき、空白ではない
    // ・クロスサイトスクリプティング(XSS)を試みていない
    if (
      props.name !== ''
      && props.email.match(emailRegExp)
      && props.message.replace(/\n+$/g, '') !== ''
      && (props.message.indexOf('<script') === -1 && props.message.indexOf('<link') === -1)
    ) {
      props.setIsComplete(true);
    } else {
      props.setIsComplete(false);
    }
  }, [props.name, props.email, props.message]);

  return (
    <div className="w-full h-full bg-white text-lg rounded-xl p-6 sm:p-6 md:p-6 lg:p-10 xl:p-10 m-auto absolute inset-0 z-40 overflow-scroll scrollbar-hidden">
      <h1 className="font-bold text-3xl mb-2">
        お問い合わせ
      </h1>
      <p className="py-1">
        ご要望やご質問、お仕事のご依頼などは、こちらのフォームからお問い合わせください。
      </p>
      <p className="py-1">
        X(@takara2314)もしくはDiscord(takara2314)のダイレクトメッセージにてご連絡ください。
      </p>
      <form
        onSubmit={(e: FormEvent) => {e.preventDefault()}}
        className="mt-7"
      >
        <div className="relative">
          <h1
            className={props.isNameError
              ? "select-none px-2 text-red-700 bg-white absolute -top-3 left-5"
              : "select-none px-2 text-green-700 bg-white absolute -top-3 left-5"
            }
          >
            お名前<span className="text-base sm:text-base md:text-base lg:text-lg xl:text-lg">（ハンドルネームでも可）</span>
          </h1>
          <input
            type="text"
            onChange={nameChangeHandler}
            ref={nameObject}
            className={props.isNameError
              ? "w-full h-16 px-3 rounded-xl bg-white border-2 border-red-700 outline-none appearance-none"
              : "w-full h-16 px-3 rounded-xl bg-white border-2 border-green-700 outline-none appearance-none"
            }
          />
        </div>
        <div className="mt-5 relative">
          <h1
            className={props.isEmailError
              ? "select-none px-2 text-red-700 bg-white absolute -top-3 left-5"
              : "select-none px-2 text-green-700 bg-white absolute -top-3 left-5"
            }
          >
            メールアドレス
          </h1>
          <input
            type="email"
            onChange={emailChangeHandler}
            ref={emailObject}
            className={props.isEmailError
              ? "w-full h-16 px-3 rounded-xl bg-white border-2 border-red-700 outline-none appearance-none"
              : "w-full h-16 px-3 rounded-xl bg-white border-2 border-green-700 outline-none appearance-none"
            }
          />
        </div>
        <div className="mt-5 relative">
          <h1
            className={props.isTextAreaError
              ? "select-none px-2 text-red-700 bg-white absolute -top-3 left-5"
              : "select-none px-2 text-green-700 bg-white absolute -top-3 left-5"
            }
          >
            お問い合わせ内容
          </h1>
          <textarea
            onChange={messageChangeHandler}
            ref={messageObject}
            className={props.isTextAreaError
              ? "w-full h-72 px-3 pt-4 pb-2 rounded-xl bg-white border-2 border-red-700 outline-none appearance-none"
              : "w-full h-72 px-3 pt-4 pb-2 rounded-xl bg-white border-2 border-green-700 outline-none appearance-none"
            }
          />
        </div>
        <div className="w-full h-12 mt-5 relative">
          {props.isComplete
            ? <input
                type="submit"
                value="確認して送信する"
                onClick={toConfirmButtonHandler}
                className="w-72 h-12 text-white font-bold bg-green-700 hover:bg-green-900 rounded-full outline-none mx-auto absolute inset-x-0 appearance-none"
              />
            : <div
                className="w-72 h-12 text-white text-center leading-12 font-bold bg-gray-400 rounded-full mx-auto absolute inset-x-0"
              >
                入力内容に不備があります
              </div>
          }
        </div>
      </form>
    </div>
  );
}

// 確認過程
const ConfirmSection = (props: ContactProps & {setNowSection: (nowSection: string) => void}) => {
  // 修正ボタンが押されたときに、前の処理(form)に移動
  const correctionHandler = () => {
    props.setNowSection('form');
  }
  // 送信ボタンが押されたときに、次の処理(wait)に移動
  const sendHandler = () => {
    props.setNowSection('wait');
  }

  return (
    <div className="w-full h-full bg-white text-lg rounded-xl p-6 sm:p-6 md:p-6 lg:p-10 xl:p-10 m-auto absolute inset-0 z-40 overflow-scroll scrollbar-hidden">
      <h1 className="font-bold text-3xl mb-2">
        お問い合わせ
      </h1>
      <p className="py-1">
        送信内容に誤りがなければ、以下の送信ボタンを押してください。
      </p>
      <section className="mt-2 p-3 text-xl bg-gray-100 rounded-xl">
        <h1 className="pb-2 text-lg text-green-700 font-bold">
          お名前
        </h1>
        {props.name}

        <h1 className="pt-4 pb-2 text-lg text-green-700 font-bold">
          メールアドレス
        </h1>
        {props.email}

        <h1 className="pt-4 pb-2 text-lg text-green-700 font-bold">
          お問い合わせ内容
        </h1>
        <div
          // 改行コードを <br> に変換して表示
          dangerouslySetInnerHTML={{__html: props.message.replace(/\n/g, '<br>')}}
        />
      </section>

      <div className="w-full h-12 mt-6 flex flex-row justify-center">
        <button
          onClick={correctionHandler}
          className="w-72 h-12 text-green-700 hover:text-green-900 font-bold bg-white mx-auto rounded-full focus:outline-none appearance-none"
        >
          修正する
        </button>

        <button
          onClick={sendHandler}
          className="w-72 h-12 text-white font-bold bg-green-700 hover:bg-green-900 mx-auto rounded-full focus:outline-none appearance-none"
        >
          送信する
        </button>
      </div>
    </div>
  );
}

// 待機過程
const WaitSection = (props: ContactProps & {setNowSection: (nowSection: string) => void}) => {
  // 最初に入力された情報を問い合わせるために、サーバーにPOST
  useEffect(() => {
    const json: SendMailPost = {
      name:      props.name,
      email:     props.email,
      content:   props.message.replace(/\n/g, '<br>'),
      touchable: 'ontouchend' in document ? true : false
    }

    sendMail(json)
    .then(() => {
      // 正常にメールを送信できたら、成功過程に移動
      props.setNowSection('success');
    })
    .catch(() => {
      // 正常にメールを送信できなかったら、失敗過程に移動
      props.setNowSection('error');
    });
  }, []);

  return (
    <div className="w-full h-full bg-white text-lg rounded-xl p-6 sm:p-6 md:p-6 lg:p-10 xl:p-10 m-auto absolute inset-0 z-40 overflow-scroll scrollbar-hidden">
      <h1 className="font-bold text-3xl mb-2">
        お問い合わせ
      </h1>
      <p className="py-1">
        メールを送信しています… 少々お待ちください…
      </p>
      <div className="w-full text-center">
        <img
          src="../public/sending.webp"
          alt="送信しています…"
          className="h-96 m-auto select-none"
        />
      </div>
    </div>
  );
}

// 成功過程
const SuccessSection = (props: ContactProps & {setNowSection: (nowSection: string) => void}) => {
  // 移動して5秒経ってから、アプリで一時保存されている入力内容を破棄し、コンポーネントを閉じる
  useEffect(() => {
    setTimeout(() => {
      props.menu.map((item: string[], index: number) => {
        if (props.place === item[1]) {
          history.pushState(null, props.menu[index][0], `/${props.place}`);
        }
      });
      props.setTitle(props.place);

      props.setName('');
      props.setEmail('');
      props.setMessage('');

      props.setIsContact(false);
    }, 5000);
  }, []);

  return (
    <div className="w-full h-full bg-white text-lg rounded-xl p-6 sm:p-6 md:p-6 lg:p-10 xl:p-10 m-auto absolute inset-0 z-40 overflow-scroll scrollbar-hidden">
      <h1 className="font-bold text-3xl mb-2">
        お問い合わせ
      </h1>
      <p className="text-xl py-1 text-green-700 font-bold">
        送信しました。
      </p>
      <p className="py-1">
        できるだけ早く返信することを心がけていますが、返信に1～3日ほどかかる場合がございます。
      </p>
      <p className="pt-5">
        この画面は5秒後に閉じられます。
      </p>
    </div>
  );
}

// 失敗過程
const ErrorSection = (props: ContactProps & {setNowSection: (nowSection: string) => void}) => {
  // 再送信ボタンを押したときに、待機過程に戻ってメールをサーバーに再送信する
  const resendHandler = () => {
    props.setNowSection('wait');
  }

  return (
    <div className="w-full h-full bg-white text-lg rounded-xl p-6 sm:p-6 md:p-6 lg:p-10 xl:p-10 m-auto absolute inset-0 z-40 overflow-scroll scrollbar-hidden">
      <h1 className="font-bold text-3xl mb-2">
        お問い合わせ
      </h1>
      <p className="text-xl py-1 text-red-700 font-bold">
        送信に失敗しました。
      </p>
      <p className="py-1">
        お手数ですが、しばらくしてから再度送信していただくか、X(@takara2314)もしくはDiscord(takara2314)のダイレクトメッセージにてご連絡ください。
      </p>
      <div className="w-full h-12 mt-6 flex flex-row justify-center">
        <button
          onClick={resendHandler}
          className="w-72 h-12 text-white font-bold bg-green-700 hover:bg-green-900 mx-auto rounded-full focus:outline-none appearance-none"
        >
          再送信する
        </button>
      </div>
    </div>
  );
}

export default Contact;
