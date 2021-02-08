import React, { useEffect, useRef, useState } from 'react';
import About from './areas/About';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, ReactThreeFiber, useFrame, useThree } from 'react-three-fiber';

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>
    }
  }
}

type WorldProps = {
  posX: number;
  posY: number;
  posZ: number;
  changePosX: (x: number) => void;
  changePosY: (y: number) => void;
  changePosZ: (z: number) => void;

  isHover:   boolean;
  hoverPosX: number;
  hoverPosY: number;
  hoverPosZ: number;
  changeIsHover:   (flag: boolean) => void;
  changeHoverPosX: (x: number) => void;
  changeHoverPosY: (y: number) => void;
  changeHoverPosZ: (z: number) => void;
}

const World: React.FC<WorldProps> = (props: WorldProps) => {
  const controlsRef = useRef<OrbitControls>();
  const { camera, gl } = useThree();

  // const ground = useRef<THREE.Mesh>({} as THREE.Mesh);
  const old_ground = useRef<THREE.Mesh>({} as THREE.Mesh);
  const boxRef = useRef<THREE.Mesh>({} as THREE.Mesh);

  useFrame(({camera}) => {
    controlsRef.current?.update();

    boxRef.current.rotation.x += 0.01;
    boxRef.current.rotation.y += 0.01;
    boxRef.current.rotation.z += 0.01;

    old_ground.current.position.x -= 0.0075;
    old_ground.current.position.z -= 0.0075;

    props.changePosX(camera.position.x);
    props.changePosY(camera.position.y);
    props.changePosZ(camera.position.z);

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key == 'f') {
        controlsRef.current?.target.set(100, 0, 0);
        camera.position.x = 100;
      }
      if (e.key == 'w') {
        controlsRef.current?.target.setX(controlsRef.current?.target.x+0.001);
        camera.position.x += 0.001;
      }
      if (e.key == 's') {
        controlsRef.current?.target.setX(controlsRef.current?.target.x-0.001);
        camera.position.x -= 0.001;
      }
      if (e.key == 'a') {
        controlsRef.current?.target.setZ(controlsRef.current?.target.z-0.001);
        camera.position.z -= 0.001;
      }
      if (e.key == 'd') {
        controlsRef.current?.target.setZ(controlsRef.current?.target.z+0.001);
        camera.position.z += 0.001;
      }
      if (e.key == ' ') {
        controlsRef.current?.target.setY(controlsRef.current?.target.y+0.001);
        camera.position.y += 0.001;
      }
      if (e.key == 'Shift') {
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
      />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <About {...props} />
      {/* <mesh
        position={[1, 1, 1]}
      >
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"rgb(50, 255, 127)"} />
      </mesh> */}
      {/* <mesh
        ref={ground}
        position={[0, 0, 0]}
      >
        <boxBufferGeometry args={[10, 10, 30]} />
        <meshStandardMaterial color={"rgb(0, 255, 127)"} />
      </mesh> */}
      <mesh
        ref={boxRef}
        position={[0, 0, 0]}
      >
        <boxBufferGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="rgb(230, 30, 0)" />
      </mesh>
      <mesh
        ref={old_ground}
        position={[3, 3, 3]}
      >
        <boxBufferGeometry args={[2, 0.5, 2]} />
        <meshStandardMaterial color={"rgb(0, 255, 127)"} />
      </mesh>
    </>
  );
}

export default World;