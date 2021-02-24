import React, { useEffect, PointerEvent } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';

const Works: React.FC<WorldProps> = (props: WorldProps) => {
  useEffect(() => {
    props.changeMemoName('works');
  }, []);

  return (
    <>
      <Base {...props} />

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('2314tk');
          e.stopPropagation();
        }}
        position={[8, 26.5, 0]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(8);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(0);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </group>
      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('kadaistore-api');
          e.stopPropagation();
        }}
        position={[-8, 26.5, 0]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(-8);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(0);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('kadaistore');
          e.stopPropagation();
        }}
        position={[0, 26.5, -8]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(0);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(-8);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('nenga2021');
          e.stopPropagation();
        }}
        position={[0, 26.5, 8]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(0);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(8);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </group>
    </>
  );
}

export default Works;