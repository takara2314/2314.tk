import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Main from '../components/main';

const title = '僕について';
const description = '気まぐれで生きている高専4年生です！幼少期にPCに興味を持ち、情報系の学校に進学しました。';

const About: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return (
    <Main
      title={title}
      description={description}
    >
    </Main>
  );
};

export default About;
