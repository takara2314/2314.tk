import React, { PointerEvent, useEffect, useState } from 'react';
import Base from './Base';
import loadBlocksByJSON from '../../services/loadBlocksByJSON';
import WorldProps from '../../models/WorldProps';

const Favorites = (props: WorldProps) => {
  const [blocks, setBlocks] = useState<any[]>(Array());
  const [loadState, setLoadState] = useState<string>('Loading');

  useEffect(() => {
    props.changeMemoName('favorites');
  }, []);

  useEffect(() => {
    fetch('../public/areas/favorites.json')
    .then(res => res.json())
    .then(
      (result) => {
        setBlocks(
          loadBlocksByJSON(
            props,
            result,
            [0, 25, 0]
          )
        );
        setLoadState('OK');
      },
      (error) => {
        setLoadState('Error');
      }
    )
  }, [props.place]);

  return (
    <>
      <Base {...props} />
      {blocks}

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('programming');
          e.stopPropagation();
        }}
        position={[4.5, 27, -5.5]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(4.5);
          props.changeHoverPosY(27);
          props.changeHoverPosZ(-5.5);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('gaming');
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
          <meshStandardMaterial color={"pink"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('music');
          e.stopPropagation();
        }}
        position={[-1, 28, -2]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(-1);
          props.changeHoverPosY(28);
          props.changeHoverPosZ(-2);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('painting');
          e.stopPropagation();
        }}
        position={[4, 27, 7.5]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(4);
          props.changeHoverPosY(27);
          props.changeHoverPosZ(7.5);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"yellow"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('foods');
          e.stopPropagation();
        }}
        position={[1.5, 28.5, 2.5]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(1.5);
          props.changeHoverPosY(28.5);
          props.changeHoverPosZ(2.5);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"lightgreen"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('kawaii');
          e.stopPropagation();
        }}
        position={[-7.5, 26.5, 0.5]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(-7.5);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(-0.5);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('anime');
          e.stopPropagation();
        }}
        position={[-6.5, 26.5, 7.5]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(-6.5);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(7.5);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"blue"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('with-someone');
          e.stopPropagation();
        }}
        position={[-6.5, 26.5, -5.5]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(-6.5);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(-5.5);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"purple"} />
        </mesh>
      </group>
    </>
  );
}

export default Favorites;