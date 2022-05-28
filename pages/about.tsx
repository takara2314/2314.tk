import type { NextPage } from 'next';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import * as atom from '../common/atom';
import Main from '../components/main';

const title = '僕について';
const description = '色々なことをやっている高専新4年生です！幼少期にPCに興味を持ち、情報系の学校に進学しました。';

const About: NextPage = () => {
  const user = useRecoilValue(atom.user);

  return (
    <Main
      title={title}
      description={description}
    >
      <div className="flex flex-col">
        <ul>
          <Link href="/">
            <a>タカラーン</a>
          </Link>
        </ul>
        <ul>
          {user}
        </ul>
      </div>
    </Main>
  );
};

export default About;
