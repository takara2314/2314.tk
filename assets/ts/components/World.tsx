import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

function World() {
  const ref1 = useRef({} as THREE.Mesh);
  const ref2 = useRef({} as THREE.Mesh);

  useFrame(() => {
    ref1.current.rotation.z += 0.01;
    ref2.current.rotation.z -= 0.01;
  });

  return (
    <>
      <mesh
        ref={ref1}
        onClick={e => console.log('click')}
        onPointerOver={e => console.log('hover')}
        onPointerOut={e => console.log('unhover')}
      >
        <boxBufferGeometry attach="geometry" args={[0.5, 20, 1]} />
        <meshBasicMaterial attach="material" color="rgb(0, 255, 0)" />
      </mesh>
      <mesh
        ref={ref2}
        onClick={e => console.log('click')}
        onPointerOver={e => console.log('hover')}
        onPointerOut={e => console.log('unhover')}
      >
        <boxBufferGeometry attach="geometry" args={[0.5, 20, 1]} />
        <meshBasicMaterial attach="material" color="rgb(25, 230, 0)" />
      </mesh>
    </>
  );
}

export default World;