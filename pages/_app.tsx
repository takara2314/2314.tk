import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { DefaultSeo } from 'next-seo';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const url = `https://2314.tk${router.route}`;

  const handleResized = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    window.addEventListener('load', handleResized);
    window.addEventListener('resize', handleResized);
    return () => {
      window.removeEventListener('resize', handleResized);
    };
  }, []);

  return (
    <RecoilRoot>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <DefaultSeo
        titleTemplate="%s - タカラーン"
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          url,
          description: 'タカラーンのポートフォリオです。'
        }}
      />

      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default MyApp;
