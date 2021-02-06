import React, { useState, useEffect, useRef } from 'react';
import World from './World';
import { Canvas } from 'react-three-fiber';

type MonitorProps = {
  place:            string;
  placeChange:      (place: string) => void;
  isLoadedContents: boolean;
  contents:         string[];
}

function Monitor(props: MonitorProps) {
  const [viewWidth, setViewWidth] = useState<number>(0);
  const [viewHeight, setViewHeight] = useState<number>(0);

  const monitorObject: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const camera = useRef({} as THREE.PerspectiveCamera);

  useEffect(() => {
    window.addEventListener('load', () => {
      setViewSize();
    });
    window.addEventListener('resize', () => {
      setViewSize();
    });
  }, []);

  const setViewSize = () => {
    setViewWidth(monitorObject.current?.clientWidth!);
    setViewHeight(monitorObject.current?.clientHeight!);
  }

  return (
    <div className="flex flex-col w-3/4 h-screen bg-black text-white relative" ref={monitorObject}>
      <section className="absolute top-0">
        <Canvas
          style={{width: viewWidth, height: viewHeight}}
        >
          <World />
        </Canvas>
      </section>
      <section className="mb-8 absolute bottom-10">
        <p>2314.tk 1.0.0 (Debug mode) - Work In Progress</p>
        <p>now place: {props.place}</p>
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