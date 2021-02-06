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

  const ground = useRef<THREE.Mesh>({} as THREE.Mesh);
  const boxRef = useRef<THREE.Mesh>({} as THREE.Mesh);

  useFrame(() => {
    controlsRef.current?.update();

    boxRef.current.rotation.x += 0.01;
    boxRef.current.rotation.y += 0.01;
    boxRef.current.rotation.z += 0.01;

    ground.current.position.x -= 0.0075;
    ground.current.position.z -= 0.0075;
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
      <mesh
        ref={boxRef}
        position={[0, 0, 0]}
      >
        <boxBufferGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="rgb(230, 30, 0)" />
      </mesh>
      <mesh
        ref={ground}
        position={[3, 3, 3]}
      >
        <boxBufferGeometry args={[2, 0.5, 2]} />
        <meshStandardMaterial color={"rgb(0, 255, 127)"} />
      </mesh>
    </>
  );
}

export default World;