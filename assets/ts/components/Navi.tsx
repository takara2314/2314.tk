import React, { useState } from 'react';

type NaviProps = {
  menu:        string[][];
  place:       string;
  placeChange: (place: string) => void;
}

const Navi: React.FC<NaviProps> = (props: NaviProps) => {
  const [takaranImg] = useState<string>('../public/takaran.png');

  const [links] = useState<string[][]>([
    [ 'Twitter', 'https://twitter.com/takara2314', '../public/Twitter.svg', 'mr-1 ml-2 w-11' ],
    [ 'Facebook', 'https://www.facebook.com/HamaguchiTakara/', '../public/Facebook.svg', 'mr-2 ml-2 w-7' ],
    [ 'GitHub', 'https://github.com/takara2314', '../public/GitHub.svg', 'mr-2 ml-2 w-7' ],
    [ 'Discord', '!拡張的な宝箱#9220', '../public/Discord.svg', 'mr-2 ml-2 mt-1 w-9' ]
  ]);

  const menuClick = (e: React.MouseEvent, item: string[]) => {
    e.preventDefault()
    history.pushState(null, item[0], `/${item[1]}`);
    props.placeChange(item[1]);
  }

  const menuFocus = (): string => {
    let className: string = '';
    let baseClass: string = 'pt-2 pb-2 w-96 h-12 rounded-r-full bg-black bg-opacity-25 absolute -right-7/24';

    props.menu.map((item: string[], index: number) => {
      if (props.place === item[1]) {
        // top-0 | top-12 | top-24 | top-36 | top-48 | top-60
        className = `${baseClass} top-${12 * index}`;
      }
    });

    return className;
  }

  return (
    <nav className="flex flex-col w-1/4 h-screen items-center rounded-r-3xl text-2xl text-center relative">
      <section className="mt-12">
        <div className="h-48">
          <a href={props.menu[0][1]} className="focus:outline-none" onClick={(e: React.MouseEvent) => menuClick(e, props.menu[0])}>
            <img src={takaranImg} alt="タカラーン" className="w-48" />
          </a>
        </div>
      </section>
      <section className="mt-2 w-48 text-left">
        <div className="h-12 text-4xl font-bold">
          <h1>
            タカラーン
          </h1>
        </div>
        <div className="-mt-2 h-10 text-xl text-gray-700">
          @takara2314
        </div>
      </section>
      <section className="mt-8 font-bold relative">
        <div className={menuFocus()}></div>
        <ul className="relative">
          {props.menu.map((item: string[], index: number) =>
            <li className="pt-2 pb-2" key={index}>
              <a href={item[1]} className="focus:outline-none" onClick={(e: React.MouseEvent) => menuClick(e, item)}>
                <span className={props.place === item[1] ? 'text-blue-600' : ''}>{item[0]}</span>
              </a>
            </li>
          )}
        </ul>
      </section>
      <section className="mt-8 pt-3 border-t-2 border-gray-300 absolute bottom-10">
        <div>
          <ul className="flex flex-row justify-center items-center">
            {links.map((item: string[], index: number) =>
              <li className={item[3]} key={index}>
                <a href={item[1]} className="focus:outline-none">
                  <img src={item[2]} alt={item[0]} className="select-none" />
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <small onClick={() => console.log('(debug) now place: ' + props.place)}>
            <span className="text-lg text-gray-700">
              &copy; 2021 Takara Hamaguchi
            </span>
          </small>
        </div>
      </section>
    </nav>
  );
}

export default Navi;