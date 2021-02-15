import React, { useEffect, useRef, useState, useMemo } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';
import TextureSet from '../../models/TextureSet';
import loadBlocksByJSON from '../../services/loadBlocksByJSON';
import { TextureLoader, NearestFilter, Vector3, Texture } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useFrame } from 'react-three-fiber';

const About: React.FC<WorldProps> = (props: WorldProps) => {
  const [blocks, setBlocks] = useState<any[]>(Array());
  const [loadState, setLoadState] = useState<string>('Loading');

  const controlsRef = useRef<OrbitControls>();

  const parts = ['head', 'body', 'right_hand', 'left_hand'];
  const angles = ['front', 'right', 'back', 'left', 'top', 'bottom'];
  const textures: TextureSet = {};
  parts.map((part: string) => {
    textures[part] = {};
    angles.map((angle: string) => {
      textures[part][angle] = useMemo(() =>
        new TextureLoader().load(
          `http://localhost:2314/public/textures/takara2314/${part}/${angle}.png`,
          (tex) => {
            tex.magFilter = NearestFilter;
          }
        ), []
      );
    })
  });

  useEffect(() => {
    fetch('http://localhost:2314/public/areas/about.json')
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

  useFrame(({camera}) => {
    controlsRef.current?.update();

    props.changePosX(camera.position.x);
    props.changePosY(camera.position.y);
    props.changePosZ(camera.position.z);
  });

  return (
    <>
      <Base {...props} />
      {blocks}
      <mesh
        position={[0, 36.9, 0]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(0);
          props.changeHoverPosY(37);
          props.changeHoverPosZ(0);
        }}
        onPointerOut={() => {
          props.changeIsHover(false);
        }}
        onClick={() => console.log('0 / 36.9 / 0')}
        scale={new Vector3(0.65, 0.65, 0.65)}
      >
        <boxBufferGeometry attach="geometry" args={[8, 8, 8]} />
        <meshStandardMaterial map={textures.head.right} attachArray="material" />
        <meshStandardMaterial map={textures.head.left} attachArray="material" />
        <meshStandardMaterial map={textures.head.top} attachArray="material" />
        <meshStandardMaterial map={textures.head.bottom} attachArray="material" />
        <meshStandardMaterial map={textures.head.back} attachArray="material" />
        <meshStandardMaterial map={textures.head.front} attachArray="material" />
      </mesh>
      <mesh
        position={[0, 30.4, 0]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(0);
          props.changeHoverPosY(30.5);
          props.changeHoverPosZ(0);
        }}
        onPointerOut={() => {
          props.changeIsHover(false);
        }}
        onClick={() => console.log('0 / 30.4 / 0')}
        scale={new Vector3(0.65, 0.65, 0.65)}
      >
        <boxBufferGeometry args={[8, 12, 4]} />
        <meshStandardMaterial map={textures.body.right} attachArray="material" />
        <meshStandardMaterial map={textures.body.left} attachArray="material" />
        <meshStandardMaterial map={textures.body.top} attachArray="material" />
        <meshStandardMaterial map={textures.body.bottom} attachArray="material" />
        <meshStandardMaterial map={textures.body.back} attachArray="material" />
        <meshStandardMaterial map={textures.body.front} attachArray="material" />
      </mesh>
      <mesh
        position={[-3.9, 30.4, 0]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(0);
          props.changeHoverPosY(30.5);
          props.changeHoverPosZ(0);
        }}
        onPointerOut={() => {
          props.changeIsHover(false);
        }}
        onClick={() => console.log('-3.9 / 30.4 / 0')}
        scale={new Vector3(0.65, 0.65, 0.65)}
      >
        <boxBufferGeometry args={[4, 12, 4]} />
        <meshStandardMaterial map={textures.left_hand.right} attachArray="material" />
        <meshStandardMaterial map={textures.left_hand.left} attachArray="material" />
        <meshStandardMaterial map={textures.left_hand.top} attachArray="material" />
        <meshStandardMaterial map={textures.left_hand.bottom} attachArray="material" />
        <meshStandardMaterial map={textures.left_hand.back} attachArray="material" />
        <meshStandardMaterial map={textures.left_hand.front} attachArray="material" />
      </mesh>
      <mesh
        position={[3.9, 30.4, 0]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(0);
          props.changeHoverPosY(30.5);
          props.changeHoverPosZ(0);
        }}
        onPointerOut={() => {
          props.changeIsHover(false);
        }}
        onClick={() => console.log('3.9 / 30.4 / 0')}
        scale={new Vector3(0.65, 0.65, 0.65)}
      >
        <boxBufferGeometry args={[4, 12, 4]} />
        <meshStandardMaterial map={textures.right_hand.right} attachArray="material" />
        <meshStandardMaterial map={textures.right_hand.left} attachArray="material" />
        <meshStandardMaterial map={textures.right_hand.top} attachArray="material" />
        <meshStandardMaterial map={textures.right_hand.bottom} attachArray="material" />
        <meshStandardMaterial map={textures.right_hand.back} attachArray="material" />
        <meshStandardMaterial map={textures.right_hand.front} attachArray="material" />
      </mesh>
    </>
  );
}

export default About;