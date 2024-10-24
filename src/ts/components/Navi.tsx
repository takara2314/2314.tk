import React, { useEffect, useState } from 'react';
import NaviProps from '../models/NaviProps';
import SocialLinksProps from '../models/SocialLinksProps';

const Navi = (props: NaviProps) => {
  // 僕のプロフィール画像(ネット以上リアル未満)
  const [takaranImg] = useState<string>('../public/takaran.png');

  // ソーシャルリンクとそのアイコンのスタイルなど
  const [links] = useState<string[][]>([
    [ 'Twitter', 'https://twitter.com/takara2314', '../public/Twitter.svg', 'mr-1 ml-2 w-11' ],
    [ 'Facebook', 'https://www.facebook.com/HamaguchiTakara/', '../public/Facebook.svg', 'mr-2 ml-2 w-7' ],
    [ 'GitHub', 'https://github.com/takara2314', '../public/GitHub.svg', 'mr-2 ml-2 w-7' ],
    [ 'Discord', '拡張的な宝箱#9220', '../public/Discord.svg', 'mr-2 ml-2 mt-1 w-9' ]
  ]);

  // Discord のユーザー名を表示させているかどうか
  const [isDiscordShow, setIsDiscordShow] = useState<boolean>(false);

  // ナビのスタイル
  const menuClass = (): string => {
    let className: string = '';
    const baseClass: string = 'flex flex-col w-3/4 sm:w-3/4 md:w-3/4 lg:w-1/4 xl:w-1/4 h-full bg-white items-center text-2xl text-center z-40 absolute';

    // モバイルでメニュー表示が有効になっていれば、普通に表示
    if (props.isMenuShowMobile) {
      className = `${baseClass} left-0`;
    } else {
      // モバイルで無効になっていても、PCでは普通に表示
      className = `${baseClass} -left-3/4 sm:-left-3/4 md:-left-3/4 lg:left-0 xl:left-0`;
    }

    return className;
  }

  // 表示域の高さによる、ナビの細かいスタイル設定
  const heightQuery = (part:
      'imageSection'
    | 'takaraImage'
    | 'nameSection'
    | 'name'
    | 'id'
    | 'menuSection'
    | 'socialSection'
    ): string => {
    let className: string = '';

    const classNames: {[key: string]: string[]} = {
      'imageSection': [
        'mt-12',
        'mt-8',
        'mt-4'
      ],
      'takaraImage': [
        'h-48',
        'h-32',
        'h-32'
      ],
      'nameSection': [
        'mt-2 w-48 text-left',
        'mt-2 w-48 pl-5 text-left',
        'mt-2 w-48 pl-5 text-left'
      ],
      'name': [
        'h-12 text-4xl font-bold',
        'h-10 text-3xl font-bold',
        'h-10 text-3xl font-bold'
      ],
      'id': [
        '-mt-2 h-10 text-xl text-gray-700',
        '-mt-2 h-10 text-lg text-gray-700',
        '-mt-2 h-10 text-lg text-gray-700'
      ],
      'menuSection': [
        'mt-8 font-bold relative',
        'mt-4 font-bold relative',
        'mt-2 font-bold relative'
      ],
      'socialSection': [
        'mt-8 pt-3 border-t-2 border-gray-300 absolute bottom-10',
        'mt-8 pt-2 border-t-2 border-gray-300 absolute bottom-4',
        'mt-8 pt-2 border-t-2 border-gray-300 absolute bottom-4'
      ]
    };

    if (props.innerHeight >= 770 || props.innerHeight === 0) {
      className = classNames[part][0];
    } else if (props.innerHeight >= 650) {
      className = classNames[part][1];
    } else {
      className = classNames[part][2];
    }

    return className;
  }

  // 行き先をクリックしたなら、そのまま遷移せず、URLを書き換えて形だけ遷移する
  // (再読み込みによるブラウザバック対策)
  const menuClick = (e: React.MouseEvent, item: string[]) => {
    e.preventDefault();
    history.pushState(null, item[0], `/${item[1]}`);
    props.changePlace(item[1]);
  }

  // 「お問い合わせ」をクリックしたなら、URLを書き換えてフォームを表示
  const contactClick = (e: React.MouseEvent, item: string[]) => {
    e.preventDefault();
    history.pushState(null, item[0], `/${item[1]}`);
    props.setIsContact(true);
  }

  // アプリ上での場所に沿って、ナビの場所名にフォーカス
  const menuFocus = (): string => {
    let className: string = '';
    const baseClass: string =
      'pt-2 pb-2 w-128 sm:w-128 md:w-128 lg:w-96 xl:w-96 h-12 rounded-r-full bg-black bg-opacity-25 ' +
      'absolute -right-3/12';

    props.menu.map((item: string[], index: number) => {
      if (props.place === item[1]) {
        // 想定されるクラス名 (Tailwind CSS パージ対策)
        // top-0 | top-12 | top-24 | top-36 | top-48 | top-60
        className = `${baseClass} top-${12 * index}`;
      }
    });

    return className;
  }

  // Discord のユーザー名を表示する枠組みのスタイル
  const discordClass = (): string => {
    let className: string = '';
    const baseClass: string = 'text-base pt-1 pr-2 pl-2 w-44 h-9 rounded-lg bg-gray-100 border-2 border-gray-300 absolute -top-3 left-10';

    if (isDiscordShow) {
      className = `${baseClass} visible`;
    } else {
      className = `${baseClass} invisible`;
    }

    return className;
  }

  return (
    <nav className={menuClass()}>
      <section className={heightQuery('imageSection')}>
        <div className={heightQuery('takaraImage')}>
          <a href={props.menu[0][1]} className="focus:outline-none" onClick={(e: React.MouseEvent) => menuClick(e, props.menu[0])}>
            <img src={takaranImg} alt="たからーん" className={heightQuery('takaraImage')} />
          </a>
        </div>
      </section>
      <section className={heightQuery('nameSection')}>
        <div className={heightQuery('name')}>
          <h1>
            たからーん
          </h1>
        </div>
        <div className={heightQuery('id')}>
          @takara2314
        </div>
      </section>
      <section className={heightQuery('menuSection')}>
        <div className={menuFocus()}></div>
        <ul className="relative">
          {props.menu.map((item: string[], index: number) =>
            <li className="pt-2 pb-2" key={index}>
              {item[1] !== 'contact'
                ? <a href={item[1]} className="focus:outline-none" onClick={(e: React.MouseEvent) => menuClick(e, item)}>
                    <span className={props.place === item[1] ? 'text-blue-600' : ''}>{item[0]}</span>
                  </a>
                : <a href={item[1]} className="focus:outline-none" onClick={(e: React.MouseEvent) => contactClick(e, item)}>
                    <span className={props.place === item[1] ? 'text-blue-600' : ''}>{item[0]}</span>
                  </a>
              }
            </li>
          )}
        </ul>
      </section>
      <section className={heightQuery('socialSection')}>
        <div>
          <ul className="flex flex-row justify-center items-center">
            <SocialLinks links={links} changeIsDiscordShow={setIsDiscordShow} />
          </ul>
          <section
            className={discordClass()}
            onMouseOver={() => setIsDiscordShow(true)}
            onMouseOut={() => setIsDiscordShow(false)}
          >
            {links[3][1]}
          </section>
        </div>
        <div>
          <small onClick={() => {
            props.setSecretTimes(props.secretTimes + 1);
          }}>
            <span className="text-lg text-gray-700">
              &copy; 2021 Takara Hamaguchi
            </span>
          </small>
        </div>
      </section>
    </nav>
  );
}

// ソーシャルリンクのコンポーネント
const SocialLinks = (props: SocialLinksProps) => {
  const elements: any = Array();

  props.links.map((item: string[], index: number) => {
    // Discord 以外はアイコンを押したときに、SNSプロフィールに移動
    if (item[0] === 'Discord') {
      elements.push(
        <li className={item[3]} key={index}>
          <img
            src={item[2]}
            alt={item[0]}
            className="select-none"
            onMouseOver={() => props.changeIsDiscordShow(true)}
            onMouseOut={() => props.changeIsDiscordShow(false)}
          />
        </li>
      );

    } else {
      elements.push(
        <li className={item[3]} key={index}>
          <a href={item[1]} className="focus:outline-none">
            <img src={item[2]} alt={item[0]} className="select-none" />
          </a>
        </li>
      );
    }
  });

  return (
    <>
      {elements}
    </>
  );
}

export default Navi;
