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

  useEffect(() => {
    setTitle(place);
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

  return (
    <>
      <div className="flex w-screen h-screen overflow-hidden">
        <Navi
          menu={menu}
          place={place}
          changePlace={changePlace}
          isMenuShowMobile={isMenuShowMobile}
          changeIsMenuShowMobile={changeIsMenuShowMobile}
        />
        <Monitor
          place={place}
          changePlace={changePlace}
        />
      </div>

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
    </>
  );
}

export default Root;