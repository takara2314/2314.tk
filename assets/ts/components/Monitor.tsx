import React, { useCallback, useState, useEffect, useRef } from 'react';
import World from './World';
import MonitorProps from '../models/MonitorProps';
import getClientData from '../services/getClientData';
import getMemo from '../services/getMemo';
import { Canvas } from 'react-three-fiber';

const Monitor = (props: MonitorProps) => {
  const [viewWidth, setViewWidth] = useState<number>(0);
  const [viewHeight, setViewHeight] = useState<number>(0);

  const [memo, setMemo] = useState<string>('Loading...');
  const [memoName, setMemoName] = useState<string>('');

  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(35);
  const [posZ, setPosZ] = useState<number>(-30);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [hoverPosX, setHoverPosX] = useState<number>(0);
  const [hoverPosY, setHoverPosY] = useState<number>(0);
  const [hoverPosZ, setHoverPosZ] = useState<number>(0);

  const [isF2Debug, setIsF2Debug] = useState<boolean>(false);

  const monitorObject: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);

  useEffect(() => {
    getClientData(
      window.innerWidth,
      window.innerHeight,
      'ontouchend' in document ? true : false
    )
    .then(res => res.json())
    .then(
      (result: any) => {
        props.setClientBrowser(result.browser);
        props.setClientDevice(result.device);
      },
      (error: Error) => {
        props.setClientBrowser('Unknown');
        props.setClientDevice('Unknown');
      }
    );
  }, []);

  useEffect(() => {
    getMemo(memoName)
    .then(res => res.text())
    .then(
      (result: string) => {
        if (result === '401 Unauthorized') {
          setMemo('<p>申し訳ございません。一時的な不具合です。</p><p>端末の向きを変えたり、ブラウザを開き直すと直る可能性があります。</p>');
        } else {
          setMemo(result);
        }
      },
      (error: Error) => {
        if (error.toString() === 'TypeError: Failed to fetch') {
          setMemo('<p>申し訳ございません。サーバーと通信できませんでした。</p>');
        } else {
          setMemo(`<p>申し訳ございません。不明なエラーが発生しました。</p><p class="text-gray-400">${error.toString()}</p>`);
        }
      }
    );
  }, [memoName]);

  useEffect(() => {
    setViewSize();

    window.addEventListener('load', () => {
      setViewSize();
      setTimeout(() => {
        setViewSize();
      }, 10);
      setTimeout(() => {
        setViewSize();
      }, 100);
      setTimeout(() => {
        setViewSize();
      }, 1000);
    });

    window.addEventListener('resize', () => {
      setViewSize();
      setTimeout(() => {
        setViewSize();
      }, 10);
      setTimeout(() => {
        setViewSize();
      }, 100);
      setTimeout(() => {
        setViewSize();
      }, 1000);
      setTimeout(() => {
        setViewSize();
      }, 1500);
      setTimeout(() => {
        setViewSize();
      }, 2000);
    });

    window.addEventListener('keydown', debugMonitorSwitch);

    return () => window.removeEventListener('keydown', debugMonitorSwitch);
  }, [props.isDebugMode]);

  useEffect(() => {
    if (props.secretTimes > 0 && props.secretTimes % 5 === 0) {
      props.setIsDebugMode(true);
    } else if (!isF2Debug) {
      props.setIsDebugMode(false);
    }
  }, [props.secretTimes]);

  const debugMonitorSwitch = useCallback((e: KeyboardEvent) => {
    if (e.key == 'F2') {
      setIsF2Debug(!isF2Debug);
      props.setIsDebugMode(!props.isDebugMode);
    }
  }, [isF2Debug, props.isDebugMode]);

  const setViewSize = () => {
    setViewWidth(monitorObject.current?.clientWidth!);
    setViewHeight(window.innerHeight);
  }

  return (
    <main className="flex flex-col w-full sm:w-full md:w-full lg:w-3/4 xl:w-3/4 h-full bg-black absolute right-0" ref={monitorObject}>
      <section className="absolute top-0 w-full h-full overflow-hidden">
        <Canvas
          style={{width: viewWidth, height: viewHeight}}
          camera={{ position: [0, 30, 0] }}
          onCreated={({ gl }) => {
            gl.setClearColor('rgb(102, 217, 255)')
          }}
        >
          <World
            place={props.place}
            changePlace={props.changePlace}
            memoName={memoName}
            changeMemoName={setMemoName}
            posX={posX}
            posY={posY}
            posZ={posZ}
            changePosX={setPosX}
            changePosY={setPosY}
            changePosZ={setPosZ}
            isHover={isHover}
            hoverPosX={hoverPosX}
            hoverPosY={hoverPosY}
            hoverPosZ={hoverPosZ}
            changeIsHover={setIsHover}
            changeHoverPosX={setHoverPosX}
            changeHoverPosY={setHoverPosY}
            changeHoverPosZ={setHoverPosZ}

            setIsCameraMoved={props.setIsCameraMoved}

            isContact={props.isContact}
          />
        </Canvas>
      </section>

      <section className={
        props.isDebugMode
        ? "text-white text-xl absolute top-24 sm:top-24 md:top-24 lg:top-0 xl:top-0 select-none visible"
        : "text-white text-xl absolute top-24 sm:top-24 md:top-24 lg:top-0 xl:top-0 select-none invisible"
      }>
        <p><span className="bg-black-opacity-25">
          2314.tk 1.0.0 (Debug mode) - beta (30th March, 2021 8th-built)
        </span></p>
        <p><span className="bg-black-opacity-25">
          Browser: {props.clientBrowser}
        </span></p>
        <p><span className="bg-black-opacity-25">
          Device: {props.clientDevice}
        </span></p>
        <p className="mb-3"><span className="bg-black-opacity-25">
          Touchable: {'ontouchend' in document ? 'true' : 'false'}
        </span></p>

        <p><span className="bg-black-opacity-25">
          Place: {props.place}
        </span></p>
        <p><span className="bg-black-opacity-25">
          Memo: {memoName}
        </span></p>
        <p><span className="bg-black-opacity-25">
          XYZ: {posX} / {posY} / {posZ}
        </span></p>
        <p><span className="bg-black-opacity-25">
          {isHover ? `HoverAt: ${hoverPosX} / ${hoverPosY} / ${hoverPosZ}` : 'HoverAt:'}
        </span></p>
        <p><span className="bg-black-opacity-25">
          SecretTimes: {props.secretTimes}
        </span></p>
      </section>

      <section
        className="bg-white text-lg w-11/12 h-64 sm:h-64 md:h-64 lg:h-60 xl:h-60 m-auto p-6 border-3 rounded-tl-2xl rounded-br-2xl shadow-2xl absolute bottom-5 right-0 left-0"
        dangerouslySetInnerHTML={{__html: memo}}
      />
    </main>
  );
}

export default Monitor;