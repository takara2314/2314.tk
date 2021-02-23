import React, { useEffect, useRef } from 'react';
import About from './areas/About';
import Skills from './areas/Skills';
import Works from './areas/Works';
import Favorites from './areas/Favorites';
import Lab from './areas/Lab';
import WorldProps from '../models/WorldProps';
import { Mesh, Vector3 } from 'three';
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

const World: React.FC<WorldProps> = (props: WorldProps) => {
  const controlsRef = useRef<OrbitControls>();
  const { camera, gl } = useThree();

  const old_ground = useRef<Mesh>({} as THREE.Mesh);
  const boxRef = useRef<Mesh>({} as THREE.Mesh);

  // カメラの初期位置
  useEffect(() => {
    camera.position.x = 0;
    camera.position.y = 35;
    camera.position.z = -30;
  }, []);

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

      <LoadPlace {...props} />
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

const LoadPlace: React.FC<WorldProps> = (props: WorldProps) => {
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