import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { DefaultSeo } from 'next-seo';
import '../styles/globals.css';
import Menu from '../components/menu';

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

  // Apply user color theme
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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

      <div className="w-screen h-screen text-black text-lg flex flex-row">
        <Menu now={router.route} />
        <div className="w-3/4 h-full bg-gray-100">
          <Component {...pageProps} />
        </div>
      </div>
    </RecoilRoot>
  );
};

export default MyApp;
