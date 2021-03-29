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
    getClientData()
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

    getMemo(memoName)
    .then(res => res.text())
    .then(
      (result: string) => {
        setMemo(result);
      },
      (error: Error) => {
        setMemo(error.toString());
      }
    );
  }, [props.clientBrowser, props.clientDevice, memoName]);

  useEffect(() => {
    window.addEventListener('load', () => {
      setViewSize();
    });

    window.addEventListener('resize', () => {
      setViewSize();
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
          2314.tk 1.0.0 (Debug mode) - beta (30th March, 2021 built)
        </span></p>
        <p><span className="bg-black-opacity-25">
          Browser: {props.clientBrowser}
        </span></p>
        <p className="mb-3"><span className="bg-black-opacity-25">
          Device: {props.clientDevice}
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