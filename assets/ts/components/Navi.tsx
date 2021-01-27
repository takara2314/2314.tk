import React from 'react';

interface NaviProps {}
interface NaviState {}

class Navi extends React.Component<NaviProps, NaviState> {
  constructor(props: NaviProps) {
    super(props);
  }

  render() {
    const takaranImg: string = '../public/takaran.png';

    const menu: string[][] = [
      [ '僕について', 'about' ],
      [ 'できること', 'skills' ],
      [ '作ったもの', 'works' ],
      [ '好きなもの', 'favorites' ],
      [ 'ラボ', 'lab' ],
      [ 'お問い合わせ', 'contact' ]
    ];

    const links: string[][] = [
      [ 'Twitter', 'https://twitter.com/takara2314', '../public/Twitter.png' ],
      [ 'Facebook', 'https://www.facebook.com/HamaguchiTakara/', '../public/Facebook.png' ],
      [ 'GitHub', 'https://github.com/takara2314', '../public/Github.png' ],
      [ 'Discord', '!拡張的な宝箱#9220', '../public/Discord.png' ]
    ];

    return (
      <nav className="flex flex-col w-1/4 h-screen items-center bg-blue-200 rounded-r-3xl text-2xl text-center">
        <section className="mt-12 bg-red-100">
          <div className="h-48 bg-green-100">
            <img src={takaranImg} alt="タカラーン" className="w-48" />
          </div>
        </section>
        <section className="mt-2 w-36 bg-red-100 text-left">
          <div className="h-12 bg-green-200 text-4xl font-bold">
            <h1>
              タカラーン
            </h1>
          </div>
          <div className="-mt-2 h-10 bg-green-300 text-xl text-gray-700">
            @takara2314
          </div>
        </section>
        <section className="mt-8 bg-red-200 font-bold">
          <ul>
            {menu.map((item) =>
              <li className="pt-2 pb-2">
                <a href={item[1]} onClick={(e) => e.preventDefault()}>{item[0]}</a>
              </li>
            )}
          </ul>
        </section>
        <section className="mt-8 bg-red-300">
          <div>
            <ul className="flex flex-row">
              {links.map((item) =>
                <li>
                  <a href={item[1]}>
                    <img src={item[2]} alt={item[0]} className="w-12" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </section>
        <section className="bg-red-300">
          <div>
            <small>
              <span className="text-lg text-gray-700">
                &copy; 2021 Takara Hamaguchi
              </span>
            </small>
          </div>
        </section>
      </nav>
    );
  }
}

export default Navi;