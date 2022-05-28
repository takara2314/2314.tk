import type { NextPage } from 'next';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import * as atom from '../common/atom';
import Main from '../components/main';

const title = 'ラボ';
const description = 'Pythonでマイコンを制御しよう！';

const Lab: NextPage = () => {
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

export default Lab;
