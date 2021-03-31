import React, { useEffect, useRef, Suspense } from 'react';
import About from './areas/About';
import Skills from './areas/Skills';
import Works from './areas/Works';
import Favorites from './areas/Favorites';
import Lab from './areas/Lab';
import WorldProps from '../models/WorldProps';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, ReactThreeFiber, useFrame, useThree } from 'react-three-fiber';
import isInRange from '../services/isinRange';

// カメラ(OrbitControls)を使う上での初期設定
extend({ OrbitControls });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>
    }
  }
}

const World = (props: WorldProps) => {
  const controlsRef = useRef<OrbitControls>();
  const { camera, gl } = useThree();

  // カメラの初期位置
  useEffect(() => {
    camera.position.x = 0;
    camera.position.y = 35;
    camera.position.z = -30;
  }, []);

  // 常時レンダリング
  useFrame(({camera}) => {
    // カメラ位置を更新
    controlsRef.current?.update();

    // 記録されている現在地を更新
    props.changePosX(camera.position.x);
    props.changePosY(camera.position.y);
    props.changePosZ(camera.position.z);

    // XYZのいずれかが1より大きく移動されてるなら、カメラが動いた判定とする
    if (!(
      isInRange(camera.position.x, 0, 1)
      && isInRange(camera.position.y, 35, 1)
      && isInRange(camera.position.z, -30, 1)
    )) {
      props.setIsCameraMoved(true);
    }

    // 特定のキーが押されたら、カメラが移動
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key == 'f' && !props.isContact) {
        controlsRef.current?.target.set(100, 0, 0);
        camera.position.x = 100;
      }
      if (e.key == 'w' && !props.isContact) {
        controlsRef.current?.target.setX(controlsRef.current?.target.x+0.001);
        camera.position.x += 0.001;
      }
      if (e.key == 's' && !props.isContact) {
        controlsRef.current?.target.setX(controlsRef.current?.target.x-0.001);
        camera.position.x -= 0.001;
      }
      if (e.key == 'a' && !props.isContact) {
        controlsRef.current?.target.setZ(controlsRef.current?.target.z-0.001);
        camera.position.z -= 0.001;
      }
      if (e.key == 'd' && !props.isContact) {
        controlsRef.current?.target.setZ(controlsRef.current?.target.z+0.001);
        camera.position.z += 0.001;
      }
      if (e.key == ' ' && !props.isContact) {
        controlsRef.current?.target.setY(controlsRef.current?.target.y+0.001);
        camera.position.y += 0.001;
      }
      if (e.key == 'Shift' && !props.isContact) {
        controlsRef.current?.target.setY(controlsRef.current?.target.y-0.001);
        camera.position.y -= 0.001;
      }
    });
  });

  return (
    <>
      <orbitControls
        ref={controlsRef}
        args={[camera, gl.domElement]}
        enabled={true}
        enableZoom={true}
        zoomSpeed={1.0}
        enableRotate={true}
        rotateSpeed={1.0}
        enablePan={true}
        panSpeed={2.0}
        minDistance={0}
        maxDistance={Infinity}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        target={
          new Vector3(0, 25, 0)
        }
      />

      <pointLight
        color={"white"}
        intensity={3}
        position={[20, 40, -20]}
        distance={40}
      />
      <pointLight
        color={"white"}
        intensity={3}
        position={[20, 40, 20]}
        distance={40}
      />
      <pointLight
        color={"white"}
        intensity={3}
        position={[-20, 40, 20]}
        distance={40}
      />
      <pointLight
        color={"white"}
        intensity={3}
        position={[-20, 40, -20]}
        distance={40}
      />

      <pointLight
        color={"white"}
        intensity={2}
        position={[50, 5, -50]}
        distance={30}
      />
      <pointLight
        color={"white"}
        intensity={2}
        position={[50, 5, 50]}
        distance={30}
      />
      <pointLight
        color={"white"}
        intensity={2}
        position={[-50, 5, -50]}
        distance={30}
      />
      <pointLight
        color={"white"}
        intensity={2}
        position={[-50, 5, -50]}
        distance={30}
      />

      <Suspense fallback={null}>
        <LoadPlace {...props} />
      </Suspense>
    </>
  );
}

// アプリ上の場所に合った、エリアコンポーネントを呼び出す
const LoadPlace = (props: WorldProps) => {
  switch (props.place) {
    case 'about':
      return <About {...props} />
    case 'skills':
      return <Skills {...props} />
    case 'works':
      return <Works {...props} />
    case 'favorites':
      return <Favorites {...props} />
    case 'lab':
      return <Lab {...props} />
  }
  return <About {...props} />
}

export default World;