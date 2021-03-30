import React, { useEffect, Suspense } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';
import { Mesh, Vector3 } from 'three';
import { useGLTF } from "@react-three/drei";

const Lab = (props: WorldProps) => {
  useEffect(() => {
    props.changeMemoName('lab');
  }, []);

  return (
    <>
      <Base {...props} />
      <Hatena {...props} />
    </>
  );
}

const Hatena = (props: WorldProps) => {
  const { nodes, materials } = useGLTF('../public/models/hatena.glb');

  return (
    <Suspense fallback={null}>
      <mesh
        position={[5, 25, 0]}
        rotation={[Math.PI * 90/180, Math.PI * 0/180, Math.PI * 180/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(5);
          props.changeHoverPosY(25);
          props.changeHoverPosZ(0);
        }}
        scale={new Vector3(25, 25, 25)}
        geometry={(nodes.hatena as Mesh).geometry}
        material={materials.hatena}
      />
    </Suspense>
  );
}
useGLTF.preload('../public/models/hatena.glb');

export default Lab;