import React, { useEffect, useRef, useState, useMemo } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';
import StrawberrysProps from '../../models/StrawberrysProps';
import TextureSet from '../../models/TextureSet';
import loadBlocksByJSON from '../../services/loadBlocksByJSON';
import { TextureLoader, NearestFilter, Vector3 } from 'three';
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
          `https://2314.tk/public/textures/takara2314/${part}/${angle}.png`,
          (tex) => {
            tex.magFilter = NearestFilter;
          }
        ), []
      );
    })
  });

  useEffect(() => {
    fetch('https://2314.tk/public/areas/about.json')
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
      <group
        onClick={() => props.changeMemoName('intro')}
        onPointerOut={() => {
          props.changeIsHover(false);
        }}
      >
        <mesh
          position={[0, 36.9, 0]}
          onPointerOver={() => {
            props.changeIsHover(true);
            props.changeHoverPosX(0);
            props.changeHoverPosY(36.9);
            props.changeHoverPosZ(0);
          }}
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
            props.changeHoverPosY(30.4);
            props.changeHoverPosZ(0);
          }}
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
            props.changeHoverPosX(-3.9);
            props.changeHoverPosY(30.4);
            props.changeHoverPosZ(0);
          }}
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
            props.changeHoverPosX(3.9);
            props.changeHoverPosY(30.4);
            props.changeHoverPosZ(0);
          }}
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
      </group>
      <group
        onClick={() => props.changeMemoName('birthday')}
        rotation={[-0.1, 0, 0]}
      >
        <mesh
          position={[4.5, 27, -4.5]}
          onPointerOver={() => {
            props.changeIsHover(true);
            props.changeHoverPosX(5);
            props.changeHoverPosY(27);
            props.changeHoverPosZ(-5);
          }}
        >
          <cylinderGeometry args={[2.5, 2.5, 1.8, 12]} />
          <meshStandardMaterial color="rgb(255, 240, 179)" />
        </mesh>
        <Strawberrys
          {...props}
          position={[4.5, 28.2, -4.5]}
          ratio={4/5}
          radius={2.2}
          amount={8}
        />
      </group>
    </>
  );
};

const Strawberrys: React.FC<WorldProps & StrawberrysProps> = (props: WorldProps & StrawberrysProps) => {
  const plots: any[] = Array(props.amount);

  const [basePosX, basePosY, basePosZ] = props.position;
  const angle: number = 2 * Math.PI / props.amount;

  for (let i = 0; i < props.amount; i++) {
    plots[i] = useMemo(() => {
      const posX: number = basePosX + props.ratio * props.radius * Math.sin(angle * i);
      const posZ: number = basePosZ + props.ratio * props.radius * Math.cos(angle * i);

      return (
        <mesh
          position={[posX, basePosY, posZ]}
          onPointerOver={() => {
            props.changeIsHover(true);
            props.changeHoverPosX(posX);
            props.changeHoverPosY(basePosY);
            props.changeHoverPosZ(posZ);
          }}
        >
          <boxBufferGeometry args={[0.5, 0.6, 0.5]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      );
    }, []);
  }

  return (
    <>
      {plots}
    </>
  );
};

export default About;