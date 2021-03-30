import React, { useState, useEffect, useRef } from 'react';
import Navi from '../components/Navi';
import Monitor from '../components/Monitor';
import Contact from '../components/Contact';
import { Transition, TransitionStatus } from 'react-transition-group';
import { contactTransitionStyle, closeContactTransitionStyle } from '../animations/contactTransition';
import alartTransitionStyle from '../animations/alartTransition';

const Root = () => {
  // ナビで表示する行き先一覧
  const [menu] = useState<string[][]>([
    [ '僕について', 'about' ],
    [ 'できること', 'skills' ],
    [ '作ったもの', 'works' ],
    [ '好きなもの', 'favorites' ],
    [ 'ラボ', 'lab' ],
    [ 'お問い合わせ', 'contact' ]
  ]);

  // アプリ上での現在地
  const [place, setPlace] = useState<string>(location.pathname.slice(1) !== ''
    ? (location.pathname.slice(1) !== 'contact'
        ? location.pathname.slice(1)
        : menu[0][1]
      )
    : menu[0][1]
  );

  // お問い合わせフォームが開いているかどうか
  const [isContact, setIsContact] = useState<boolean>(false);
  // モバイル端末でナビを開いているかどうか
  const [isMenuShowMobile, changeIsMenuShowMobile] = useState<boolean>(false);
  // 表示域の高さ
  const [innerHeight, setInnerHeight] = useState<number>(0);
  // コピーライトをクリックした回数
  const [secretTimes, setSecretTimes] = useState<number>(0);
  // デバッグモード(F2)かどうか
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false);
  // お問い合わせフォームの記入内容
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  // お問い合わせフォームの記入内容の評価
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isTextAreaError, setIsTextAreaError] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  // ウェルカムボードを表示するかどうか
  const [isAlart, setIsAlart] = useState<boolean>(false);
  // ユーザーのブラウザ、デバイス
  const [clientBrowser, setClientBrowser] = useState<string>('Loading...');
  const [clientDevice, setClientDevice] = useState<string>('Loading...');
  // アプリ内のカメラが動いたがどうか
  const [isCameraMoved, setIsCameraMoved] = useState<boolean>(false);
  // 定められているPCデバイス一覧
  const pcDevices: string[] = [
    'Windows', 'Mac', 'Linux', 'Others'
  ];

  const rootObj: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // ページが読み込まれたときに、最初に行う処理
  useEffect(() => {
    // 表示されるタイトルを適切なものにする
    setTitle(place);

    // お問い合わせフォームの指定があれば、そのままフォームを開く
    if (location.pathname.slice(1) === 'contact') {
      setIsContact(true);
    }

    // 1秒後にウェルカムボードを表示
    setTimeout(() => {
      setIsAlart(true);
    }, 1000);
  }, []);

  // 画面表示に関する処理
  useEffect(() => {
    // ページが表示されたら、表示域のサイズを取得して適切なサイズに設定
    changeWindowSize();
    // ページがロードされたら、処理遅延の問題で、もう何度かリサイズ処理
    window.addEventListener('load', () => {
      changeWindowSize();
      setTimeout(() => {
        changeWindowSize();
      }, 10);
      setTimeout(() => {
        changeWindowSize();
      }, 100);
      setTimeout(() => {
        changeWindowSize();
      }, 1000);
    });
    // ページがリサイズされたら、処理遅延の問題で、もう何度かリサイズ処理
    window.addEventListener('resize', () => {
      changeWindowSize();
      setTimeout(() => {
        changeWindowSize();
      }, 10);
      setTimeout(() => {
        changeWindowSize();
      }, 100);
      setTimeout(() => {
        changeWindowSize();
      }, 1000);
    });
  }, []);

  // ウェルカムボードを15秒間表示したら非表示にする
  useEffect(() => {
    if (isAlart) {
      setTimeout(() => {
        setIsAlart(false);
      }, 15000);
    }
    // カメラが動いたなら即座に削除
    if (isCameraMoved) {
      setIsAlart(false);
    }
  }, [isAlart, isCameraMoved]);

  // 表示域のサイズを取得して、そのサイズに適するサイズにする
  const changeWindowSize = () => {
    setInnerHeight(window.innerHeight);
    rootObj.current!.style.width = `${window.innerWidth}px`;
    rootObj.current!.style.height = `${window.innerHeight}px`;
  }

  // アプリ上での位置を変更する
  const changePlace = (place: string) => {
    setPlace(place);
    setTitle(place);
  }

  // タイトルを設定
  const setTitle = (place: string) => {
    menu.map((item: string[], index: number) => {
      if (place === item[1]) {
        document.title = `${item[0]} - タカラーン`
      }
    });
  }

  // モバイル端末で見たとき、メニューを非表示にする部分のスタイル
  const hideMenuClass = () => {
    let className: string = '';
    const baseClass: string = 'w-full h-full bg-black opacity-50 absolute top-0 z-30';

    if (isMenuShowMobile) {
      className = `${baseClass} visible sm:visible md:visible lg:invisible xl:invisible`;
    } else {
      className = `${baseClass} invisible`;
    }

    return className;
  }

  // スマホ横画面のときに表示する警告のスタイル
  const landscapeClass = (): string => {
    let className: string = '';

    const baseClass: string =
      'w-full h-full '
      + 'bg-yellow-500 text-white '
      + 'flex flex-row justify-center items-center '
      + 'absolute top-0 z-50';

    if (innerHeight >= 500 || innerHeight === 0) {
      className = `${baseClass} invisible`;
    } else {
      className = `${baseClass} visible`;
    }

    return className;
  }

  return (
    <div className="flex relative overflow-hidden" ref={rootObj}>
      <Navi
        menu={menu}
        place={place}
        changePlace={changePlace}
        isContact={isContact}
        setIsContact={setIsContact}
        isMenuShowMobile={isMenuShowMobile}
        changeIsMenuShowMobile={changeIsMenuShowMobile}
        innerHeight={innerHeight}
        secretTimes={secretTimes}
        setSecretTimes={setSecretTimes}
      />
      <Monitor
        place={place}
        changePlace={changePlace}
        secretTimes={secretTimes}
        setSecretTimes={setSecretTimes}
        isDebugMode={isDebugMode}
        setIsDebugMode={setIsDebugMode}

        isContact={isContact}

        clientBrowser={clientBrowser}
        setClientBrowser={setClientBrowser}
        clientDevice={clientDevice}
        setClientDevice={setClientDevice}

        setIsCameraMoved={setIsCameraMoved}
      />

      <Transition
        in={isAlart}
        timeout={{enter: 0, exit: 1000}}
        mountOnEnter unmountOnExit
      >
        {(state: TransitionStatus) =>
          <div
            style={alartTransitionStyle[state]}
            className="w-72 sm:w-72 md:w-72 lg:w-80 xl:w-80 px-4 py-3 text-base bg-white shadow-xl rounded-l-xl absolute top-6 right-0"
          >
            <h1 className="font-bold text-xl text-green-700">
              僕のサイトへようこそ！
            </h1>
            {pcDevices.includes(clientDevice)
              ? <>
                  <p>
                    マウスでドラッグして画面を動かし、気になるところをクリックしてみよう！
                  </p>
                  <p className="text-gray-400">
                    見にくかったらズームしてね！
                  </p>
                </>
              : <>
                  <p>
                    スワイプして画面を動かし、気になるところをタップしてみよう！
                  </p>
                  <p className="text-gray-400">
                    見にくかったらズームしてね！
                  </p>
                </>
            }
          </div>
        }
      </Transition>

      <Transition
        in={isContact}
        timeout={{enter: 0, exit: 1000}}
        mountOnEnter unmountOnExit
      >
        {(state: TransitionStatus) =>
          <div
            style={closeContactTransitionStyle[state]}
            className="w-full h-full bg-black opacity-50 absolute top-0 z-40"
            onClick={() => {
              menu.map((item: string[], index: number) => {
                if (place === item[1]) {
                  history.pushState(null, menu[index][0], `/${place}`);
                }
              });
              setTitle(place);
              setIsContact(false);
            }}
          />
        }
      </Transition>

      <Transition
        in={isContact}
        timeout={{enter: 0, exit: 1000}}
        mountOnEnter unmountOnExit
      >
        {(state: TransitionStatus) =>
          <div
            style={contactTransitionStyle[state]}
            className="w-11/12 h-3/4 m-auto z-40"
          >
            <Contact
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              message={message}
              setMessage={setMessage}

              isNameError={isNameError}
              setIsNameError={setIsNameError}
              isEmailError={isEmailError}
              setIsEmailError={setIsEmailError}
              isTextAreaError={isTextAreaError}
              setIsTextAreaError={setIsTextAreaError}
              isComplete={isComplete}
              setIsComplete={setIsComplete}

              place={place}
              menu={menu}
              setTitle={setTitle}
              setIsContact={setIsContact}
            />
          </div>
        }
      </Transition>

      <div
        className={hideMenuClass()}
        onClick={() => {changeIsMenuShowMobile(false)}}
      />

      <div
        className={
          "w-16 h-16 bg-gray-200 rounded-lg pt-3 pb-3 shadow-2xl flex flex-col items-center justify-around " +
          "absolute top-3 left-3 visible sm:visible md:visible lg:invisible xl:invisible"
        }
        onClick={() => changeIsMenuShowMobile(true)}
      >
        <div className="w-10 h-1 bg-green-700 rounded-full" />
        <div className="w-10 h-1 bg-green-800 rounded-full" />
        <div className="w-10 h-1 bg-green-900 rounded-full" />
      </div>

      {isContact
        ? <></>
        : <div className={landscapeClass()}>
            <section className="p-8 pr-4">
              <img
                src="../public/sorry.webp"
                className="w-72"
              />
            </section>
            <section className="p-8 pl-4">
              <div>
                <h1 className="text-3xl font-bold mb-3">
                  横画面にしないでください！
                </h1>
              </div>
              <div className="text-lg">
                <p className="mb-2">
                  すみませんが、スマートフォンの横向き表示には、まだ対応しておりません。m(_ _)m
                </p>
                <p>
                  今後のアップデートで対応いたしますので、今しばらくお待ちください。
                </p>
              </div>
            </section>
          </div>
      }
    </div>
  );
}

export default Root;