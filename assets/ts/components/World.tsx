import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

function World() {
  const ref = useRef({} as THREE.Mesh);
  useFrame(() => (ref.current.rotation.z += 0.01));
  return (
    <>
      <mesh
        ref={ref}
        onClick={e => console.log('click')}
        onPointerOver={e => console.log('hover')}
        onPointerOut={e => console.log('unhover')}
      >
        <boxBufferGeometry attach="geometry" args={[0.5, 20, 1]} />
        <meshBasicMaterial attach="material" color="rgb(0, 255, 0)" />
      </mesh>
    </>
  );
}

export default World;