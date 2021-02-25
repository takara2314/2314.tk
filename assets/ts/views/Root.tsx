import React, { useState, useEffect } from 'react';
import Navi from '../components/Navi';
import Monitor from '../components/Monitor';

const Root: React.FC = () => {
  const [menu] = useState<string[][]>([
    [ '僕について', 'about' ],
    [ 'できること', 'skills' ],
    [ '作ったもの', 'works' ],
    [ '好きなもの', 'favorites' ],
    [ 'ラボ', 'lab' ],
    [ 'お問い合わせ', 'contact' ]
  ]);

  const [place, setPlace] = useState<string>(location.pathname.slice(1) !== ''
    ? location.pathname.slice(1)
    : menu[0][1]
  );

  const [isMenuShowMobile, changeIsMenuShowMobile] = useState<boolean>(false);

  const [innerHeight, setInnerHeight] = useState<number>(0);

  useEffect(() => {
    setTitle(place);

    window.addEventListener('load', () => {
      setInnerHeight(window.innerHeight);
    });
    window.addEventListener('resize', () => {
      setInnerHeight(window.innerHeight);
    });
  }, []);

  const changePlace = (place: string) => {
    setPlace(place);
    setTitle(place);
  }

  const setTitle = (place: string) => {
    menu.map((item: string[], index: number) => {
      if (place === item[1]) {
        document.title = `${item[0]} - タカラーン`
      }
    });
  }

  const hideMenuClass = () => {
    let className: string = '';
    const baseClass: string = 'w-full h-full bg-black opacity-50 absolute top-0';

    if (isMenuShowMobile) {
      className = `${baseClass} visible sm:visible md:visible lg:invisible xl:invisible`;
    } else {
      className = `${baseClass} invisible`;
    }

    return className;
  }

  const landscapeClass = (): string => {
    let className: string = '';

    const baseClass: string =
      'w-screen h-screen '
      + 'bg-yellow-500 text-white '
      + 'flex flex-row justify-center items-center '
      + 'absolute top-0 z-50';

    if (innerHeight >= 500 || innerHeight === 0) {
      className = `${baseClass} invisible`;
    } else {
      className = `${baseClass} visible`;
    }

    return className
  }

  return (
    <>
      <Navi
        menu={menu}
        place={place}
        changePlace={changePlace}
        isMenuShowMobile={isMenuShowMobile}
        changeIsMenuShowMobile={changeIsMenuShowMobile}
        innerHeight={innerHeight}
      />
      <Monitor
        place={place}
        changePlace={changePlace}
      />

      <div
        className={hideMenuClass()}
        onClick={() => changeIsMenuShowMobile(false)}
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

      <div className={landscapeClass()}>
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
    </>
  );
}

export default Root;