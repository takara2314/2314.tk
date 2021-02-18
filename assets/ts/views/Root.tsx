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

  const [isLoadedContents, setIsLoadedContents] = useState<boolean>(false);
  const [contents, setContents] = useState<string[]>([]);

  useEffect(() => {
    console.log("now place: " + place);
    setTitle(place);
    getContents(place);
  }, []);

  const changePlace = (place: string) => {
    setPlace(place);
    setTitle(place);
    getContents(place);
  };

  const setTitle = (place: string) => {
    menu.map((item: string[], index: number) => {
      if (place === item[1]) {
        document.title = `${item[0]} - タカラーン`
      }
    });
  };

  const getContents = (place: string) => {
    fetch(`https://2314.tk/public/contents/${place}.json`)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoadedContents(true);
        setContents(result.contents);
      },
      (error) => {
        setIsLoadedContents(true);
        setContents([`エラーが発生しました。${error}`]);
      }
    );
  };

  return (
    <div className="flex">
      <Navi menu={menu} place={place} changePlace={(place: string) => changePlace(place)} />
      <Monitor place={place} changePlace={(place: string) => changePlace(place)} isLoadedContents={isLoadedContents} contents={contents} />
    </div>
  );
}

export default Root;