import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import ContactProps from '../models/ContactProps';

const Contact = (props: ContactProps) => {
  const nameObject: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const emailObject: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const messageObject: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null);

  // 電子メールアドレスの正規表現
  const emailRegExp: RegExp = new RegExp(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/);

  useEffect(() => {
    document.title = 'お問い合わせ - タカラーン';
  }, []);

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
    if (props.name !== '' && props.email.match(emailRegExp) && props.message !== '') {
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
              ? "w-full h-72 px-3 pt-4 rounded-xl bg-white border-2 border-red-700 outline-none"
              : "w-full h-72 px-3 pt-4 rounded-xl bg-white border-2 border-green-700 outline-none"
            }
          />
        </div>
        <div className="w-full h-10 mt-5 relative">
          {props.isComplete
            ? <input
                type="submit"
                value="確認して送信する"
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
  )
}

export default Contact;