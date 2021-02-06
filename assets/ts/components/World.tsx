import React, { useEffect, useRef } from 'react';
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

const World: React.FC = () => {
  const controlsRef = useRef<OrbitControls>();
  const { camera, gl } = useThree();
  console.log(camera);

  // const ground = useRef<THREE.Mesh>({} as THREE.Mesh);
  const old_ground = useRef<THREE.Mesh>({} as THREE.Mesh);
  const boxRef = useRef<THREE.Mesh>({} as THREE.Mesh);

  useFrame(() => {
    controlsRef.current?.update();

    boxRef.current.rotation.x += 0.01;
    boxRef.current.rotation.y += 0.01;
    boxRef.current.rotation.z += 0.01;

    old_ground.current.position.x -= 0.0075;
    old_ground.current.position.z -= 0.0075;

    for (let i: number = 0; i < 10; i++) {
      console.log('test');
    }
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
      {(() => {
        const blocks = Array();
        for (let x: number = 0; x < 20; x++) {
          for (let y: number = 0; y < 2; y++) {
            for (let z: number = 0; z < 20; z++) {
              blocks.push(
                <mesh
                  position={[x, y, z]}
                >
                  <boxBufferGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color={"rgb(0, 255, 127)"} />
                </mesh>
              );
            }
          }
        }
        return blocks;
      })()}
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