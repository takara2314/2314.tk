import React, { useState, useEffect, useRef } from 'react';
import World from './World';
import MonitorProps from '../models/MonitorProps';
import loadMemo from '../services/loadMemo';
import { Canvas } from 'react-three-fiber';

const Monitor: React.FC<MonitorProps> = (props: MonitorProps) => {
  const [viewWidth, setViewWidth] = useState<number>(0);
  const [viewHeight, setViewHeight] = useState<number>(0);
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false);

  const [memo, setMemo] = useState<string>('Loading...');
  const [memoName, setMemoName] = useState<string>('');

  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [posZ, setPosZ] = useState<number>(0);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [hoverPosX, setHoverPosX] = useState<number>(0);
  const [hoverPosY, setHoverPosY] = useState<number>(0);
  const [hoverPosZ, setHoverPosZ] = useState<number>(0);

  const monitorObject: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMemo(memoName)
    .then(res => res.text())
    .then(
      (result: string) => {
        console.log(result);
        setMemo(result);
      },
      (error: Error) => {
        setMemo(error.toString());
      }
    );
  }, [memoName]);

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

  const changeMemoName = (name: string) => {
    setMemoName(name);
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
  const changeIsHover = (flag: boolean) => {
    setIsHover(flag);
  }
  const changeHoverPosX = (x: number) => {
    setHoverPosX(x);
  }
  const changeHoverPosY = (y: number) => {
    setHoverPosY(y);
  }
  const changeHoverPosZ = (z: number) => {
    setHoverPosZ(z);
  }

  return (
    <div className="flex flex-col w-3/4 h-screen bg-black relative" ref={monitorObject}>
      <section className="absolute top-0">
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
            changeMemoName={changeMemoName}
            posX={posX}
            posY={posY}
            posZ={posZ}
            changePosX={changePosX}
            changePosY={changePosY}
            changePosZ={changePosZ}
            isHover={isHover}
            hoverPosX={hoverPosX}
            hoverPosY={hoverPosY}
            hoverPosZ={hoverPosZ}
            changeIsHover={changeIsHover}
            changeHoverPosX={changeHoverPosX}
            changeHoverPosY={changeHoverPosY}
            changeHoverPosZ={changeHoverPosZ}
          />
        </Canvas>
      </section>

      <section className={
        isDebugMode ? "text-white text-xl absolute top-0 select-none visible" : "text-white text-xl absolute top-0 select-none invisible"
      }>
        <p>
          <span className="bg-black-opacity-25">2314.tk 1.0.0 (Debug mode) - Work In Progress</span>
        </p>
        <p>
          <span className="bg-black-opacity-25">place: {props.place}</span>
        </p>
        <p>
          <span className="bg-black-opacity-25">memo: {memoName}</span>
        </p>
        <p>
          <span className="bg-black-opacity-25">XYZ: {posX} / {posY} / {posZ}</span>
        </p>
        <p>
          <span className="bg-black-opacity-25">
            {isHover ? `HoverAt: ${hoverPosX} / ${hoverPosY} / ${hoverPosZ}` : 'HoverAt:'}
          </span>
        </p>
      </section>

      <section className="bg-white w-11/12 h-60 m-auto p-4 border-3 rounded-tl-2xl rounded-br-2xl shadow-2xl absolute bottom-5 right-0 left-0">
        <p>Press <b>F2</b> to change to advanced debug mode.</p>
        <div className="text-red-500">
          <p>現在制作中です。</p>
          <p>以下は仮に置いているテキストです！</p>
        </div>
        <div dangerouslySetInnerHTML={{__html: memo}} />
      </section>
    </div>
  );
}

export default Monitor;