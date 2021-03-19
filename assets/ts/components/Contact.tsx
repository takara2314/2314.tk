import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import sendMail from '../services/sendMail';
import ContactProps from '../models/ContactProps';
import SendMailPost from '../models/SendMailPost';

const Contact = (props: ContactProps) => {
  const [nowSection, setNowSection] = useState<string>('form');

  useEffect(() => {
    document.title = 'お問い合わせ - タカラーン';
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
    </>
  );
}

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

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    nameCheck(e.target.value);
  }
  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    emailCheck(e.target.value);
  }
  const messageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    messageCheck(e.target.value);
  }

  const toConfirmButtonHandler = () => {
    props.setNowSection('confirm');
  }

  const nameCheck = (value: string): void => {
    if (value === '') {
      props.setName('');
      props.setIsNameError(true);
    } else {
      props.setName(value);
      props.setIsNameError(false);
    }
  }

  const emailCheck = (value: string): void => {
    if (value.match(emailRegExp)) {
      props.setEmail(value);
      props.setIsEmailError(false);
    } else {
      props.setEmail(value);
      props.setIsEmailError(true);
    }
  }

  const messageCheck = (value: string): void => {
    if (value === '') {
      props.setMessage('');
      props.setIsTextAreaError(true);
    } else {
      props.setMessage(value);
      props.setIsTextAreaError(false);
    }
  }

  useEffect(() => {
    // 送信ボタンを表示する条件
    // ・名前が空白ではない
    // ・メアドが正規表現通り
    // ・メッセージが空白ではない
    // ・XSSを試みていない
    if (
      props.name !== ''
      && props.email.match(emailRegExp)
      && props.message !== ''
      && (props.message.indexOf('<script') === -1 && props.message.indexOf('<link') === -1)
    ) {
      props.setIsComplete(true);
    } else {
      props.setIsComplete(false);
    }
  }, [props.name, props.email, props.message]);

  return (
    <div className="w-11/12 h-3/4 bg-white text-lg rounded-xl p-6 sm:p-6 md:p-6 lg:p-10 xl:p-10 m-auto absolute inset-0 z-40 overflow-scroll scrollbar-hidden">
      <h1 className="font-bold text-3xl mb-2">
        お問い合わせ
      </h1>
      <p className="py-1">
        要望や質問、お仕事のお依頼などはこちらのフォームからお問い合わせください。
      </p>
      <p className="py-1">
        早速の返信が必要な場合は、このフォームではなく、Twitter(@takara2314)もしくは、Discord(拡張的な宝箱#9220)のダイレクトメッセージにてお願いします。
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
              ? "w-full h-16 px-3 rounded-xl bg-white border-2 border-red-700 outline-none"
              : "w-full h-16 px-3 rounded-xl bg-white border-2 border-green-700 outline-none"
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
              ? "w-full h-16 px-3 rounded-xl bg-white border-2 border-red-700 outline-none"
              : "w-full h-16 px-3 rounded-xl bg-white border-2 border-green-700 outline-none"
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
              ? "w-full h-72 px-3 pt-4 pb-2 rounded-xl bg-white border-2 border-red-700 outline-none"
              : "w-full h-72 px-3 pt-4 pb-2 rounded-xl bg-white border-2 border-green-700 outline-none"
            }
          />
        </div>
        <div className="w-full h-12 mt-5 relative">
          {props.isComplete
            ? <input
                type="submit"
                value="確認して送信する"
                onClick={toConfirmButtonHandler}
                className="w-72 h-12 text-white font-bold bg-green-700 hover:bg-green-900 rounded-full outline-none mx-auto absolute inset-x-0"
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

const ConfirmSection = (props: ContactProps & {setNowSection: (nowSection: string) => void}) => {
  const correctionHandler = () => {
    props.setNowSection('form');
  }

  const sendHandler = () => {
    const json: SendMailPost = {
      name:    props.name,
      email:   props.email,
      content: props.message.replace(/\n/g, '<br>')
    }

    sendMail(json)
    .then(() => {
      props.menu.map((item: string[], index: number) => {
        if (props.place === item[1]) {
          history.pushState(null, props.menu[index][0], `/${props.place}`);
        }
      });
      props.setTitle(props.place);

      props.setName('');
      props.setEmail('');
      props.setMessage('');

      props.setAlart('お問い合わせを送信しました。');
      props.setIsAlart(true);

      props.setIsContact(false);
    });
  }

  return (
    <div className="w-11/12 h-3/4 bg-white text-lg rounded-xl p-6 sm:p-6 md:p-6 lg:p-10 xl:p-10 m-auto absolute inset-0 z-40 overflow-scroll scrollbar-hidden">
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
          className="w-72 h-12 text-green-700 hover:text-green-900 font-bold bg-white mx-auto rounded-full focus:outline-none"
        >
          修正する
        </button>

        <button
          onClick={sendHandler}
          className="w-72 h-12 text-white font-bold bg-green-700 hover:bg-green-900 mx-auto rounded-full focus:outline-none"
        >
          送信する
        </button>
      </div>
    </div>
  );
}

export default Contact;