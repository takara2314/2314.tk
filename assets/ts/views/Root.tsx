import React, { useState, useEffect } from 'react';
import Navi from '../components/Navi';
import World from '../components/World';

function Root() {
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
    getContents(place);
  }, [])

  const placeChange = (place: string) => {
    setPlace(place);
    getContents(place);
  }

  const getContents = (place: string) => {
    fetch(`http://localhost:2314/public/contents/${place}.json`)
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
  }

  return (
    <div className="flex">
      <Navi menu={menu} place={place} placeChange={(place: string) => placeChange(place)} />
      <World place={place} placeChange={(place: string) => placeChange(place)} isLoadedContents={isLoadedContents} contents={contents} />
    </div>
  );
}

export default Root;