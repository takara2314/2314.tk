import Link from 'next/link';
import Image from 'next/image';

interface Props {
  now: string
}

interface NaviItemProps {
  label: string
  href: string
  now: string
  height: string
}

const Menu = ({ now }: Props) => {
  const pages = [
    { label: "僕について", href: "/" },
    { label: "できること", href: "/skills" },
    { label: "作ったもの", href: "/works" },
    { label: "ラボ", href: "/lab" },
    { label: "お問い合わせ", href: "/contact" },
    { label: "軽量版サイト", href: "https://takara.2314.tk/" }
  ];

  return (
    <nav className="flex flex-col w-1/4 h-full bg-white items-center text-center justify-around">
      <section>
        <div>
          <Link href="/">
            <a>
              <div className="w-56 h-56 mask mask-squircle relative">
                <Image
                  src="/takaran.png"
                  alt="タカラーン"
                  layout="fill"
                />
              </div>
            </a>
          </Link>
        </div>
        <div className="mt-5">
          <h1 className="text-4xl font-bold">
            タカラーン
          </h1>
          @takara2314
        </div>
      </section>

      <ul className="w-full">
        {pages.map((item) =>
          <NaviItem label={item.label} href={item.href} now={now} height="3rem" key={item.label} />
        )}
      </ul>

      <section className="border-t-2 border-gray-300">
        <ul className="my-3 w-full flex flex-row justify-around">
          <li>☆</li>
          <li>☆</li>
          <li>☆</li>
          <li>☆</li>
        </ul>
        <small className="text-lg text-gray-700">
          © 2022 Takara Hamaguchi
        </small>
      </section>
    </nav >
  );
};

const NaviItem = ({ label, href, now, height }: NaviItemProps) => {
  // h-[3rem] | leading-[3rem]

  return (
    <li className={`w-full h-[${height}] text-[1.4rem] font-bold`}>
      <Link href={href}>
        <a>
          <div className={`h-full leading-[${height}] relative`}>
            {href === now &&
              <div className="w-11/12 h-full bg-blue-100 rounded-r-full absolute top-0" />
            }
            <div className={
              href === now
                ? "w-full text-blue-600 text-center absolute top-0"
                : "w-full text-center absolute top-0"
            }>
              {label}
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default Menu;
