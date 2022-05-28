import type { NextPage } from 'next';
import Link from 'next/link';
import type { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import * as atom from '../common/atom';
import Main from '../components/main';

const title = 'ホーム';
const description = '色々なことをやっている高専新4年生です！幼少期にPCに興味を持ち、情報系の学校に進学しました。';

const Home: NextPage = () => {
  const [user, setUser] = useRecoilState(atom.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  return (
    <Main
      title={title}
      description={description}
    >
      <div className="flex flex-col">
        <ul>
          <Link href="/about">
            <a>タカラーン</a>
          </Link>
        </ul>
        <ul>
          <input
            className="border-2 border-gray-500"
            value={user}
            onChange={handleChange}
          />
        </ul>
      </div>
    </Main>
  );
};

export default Home;
