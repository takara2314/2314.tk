import React, { useState, useEffect, useRef } from 'react';
import World from './World';
import { Canvas, useFrame } from 'react-three-fiber';

type MonitorProps = {
  place:            string;
  placeChange:      (place: string) => void;
  isLoadedContents: boolean;
  contents:         string[];
}

const Monitor: React.FC<MonitorProps> = (props: MonitorProps) => {
  const [viewWidth, setViewWidth] = useState<number>(0);
  const [viewHeight, setViewHeight] = useState<number>(0);
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false);

  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [posZ, setPosZ] = useState<number>(0);

  const monitorObject: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('load', () => {
      setViewSize();
    });

    window.addEventListener('resize', () => {
      setViewSize();
    });

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key == 'F2') {
        setIsDebugMode(!isDebugMode);
      }
    });
  }, [isDebugMode]);

  const setViewSize = () => {
    setViewWidth(monitorObject.current?.clientWidth!);
    setViewHeight(monitorObject.current?.clientHeight!);
  }

  const changePosX = (x: number) => {
    setPosX(x);
  }
  const changePosY = (y: number) => {
    setPosY(y);
  }
  const changePosZ = (z: number) => {
    setPosZ(z);
  }

  return (
    <div className="flex flex-col w-3/4 h-screen bg-black text-white relative" ref={monitorObject}>
      <section className="absolute top-0">
        <Canvas
          style={{width: viewWidth, height: viewHeight}}
          camera={{ position: [0, 4, 0] }}
          onCreated={({ gl, camera }) => {
            gl.setClearColor('rgb(102, 217, 255)')
          }}
        >
          <World posX={posX} posY={posY} posZ={posZ} changePosX={changePosX} changePosY={changePosY} changePosZ={changePosZ} />
        </Canvas>
      </section>

      <section className={
        isDebugMode ? "absolute top-0 text-xl select-none visible" : "text-xl absolute top-0 select-none invisible"
      }>
        <p>
          <span className="bg-black-opacity-25">2314.tk 1.0.0 (Debug mode) - Work In Progress</span>
        </p>
        <p>
          <span className="bg-black-opacity-25">now place: {props.place}</span>
        </p>
        <p>
          <span className="bg-black-opacity-25">XYZ: {posX} / {posY} / {posZ}</span>
        </p>
      </section>

      <section className="mb-8 absolute bottom-10">
        <p>Press <b>F2</b> to change to advanced debug mode.</p>
        <div className="text-red-500">
          <p>現在制作中です。</p>
          <p>以下は仮に置いているテキストです！</p>
        </div>
        <div className="text-xl">
          {!props.isLoadedContents ? 'Loading...' : props.contents.map(
            (sentence: string, index: number) =>
              <p key={index}>
                {sentence}
              </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Monitor;