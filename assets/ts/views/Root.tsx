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

  useEffect(() => {
    setTitle(place);
  }, []);

  const changePlace = (place: string) => {
    setPlace(place);
    setTitle(place);
  };

  const setTitle = (place: string) => {
    menu.map((item: string[], index: number) => {
      if (place === item[1]) {
        document.title = `${item[0]} - タカラーン`
      }
    });
  };

  return (
    <div className="flex">
      <Navi menu={menu} place={place} changePlace={(place: string) => changePlace(place)} />
      <Monitor place={place} changePlace={(place: string) => changePlace(place)} />
    </div>
  );
}

export default Root;