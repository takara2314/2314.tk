import React, { useEffect, useRef, useState } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';
import loadBlocksByJSON from '../../services/loadBlocksByJSON';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, ReactThreeFiber, useFrame, useThree } from 'react-three-fiber';

const About: React.FC<WorldProps> = (props: WorldProps) => {
  const [blocks, setBlocks] = useState<any[]>(Array());
  const [loadState, setLoadState] = useState<string>('Loading');

  const controlsRef = useRef<OrbitControls>();

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
        onClick={() => console.log('0 / 30.5 / 0')}
        scale={new THREE.Vector3(0.65, 0.65, 0.65)}
      >
        <boxBufferGeometry args={[8, 12, 4]} />
        <meshStandardMaterial color={'rgb(0, 0, 255)'} />
      </mesh>
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
        onClick={() => console.log('0 / 37 / 0')}
        scale={new THREE.Vector3(0.65, 0.65, 0.65)}
      >
        <boxBufferGeometry args={[8, 8, 8]} />
        <meshStandardMaterial color={'rgb(0, 100, 230)'} />
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
        onClick={() => console.log('0 / 30.5 / 0')}
        scale={new THREE.Vector3(0.65, 0.65, 0.65)}
      >
        <boxBufferGeometry args={[4, 12, 4]} />
        <meshStandardMaterial color={'rgb(130, 0, 235)'} />
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
        onClick={() => console.log('0 / 30.5 / 0')}
        scale={new THREE.Vector3(0.65, 0.65, 0.65)}
      >
        <boxBufferGeometry args={[4, 12, 4]} />
        <meshStandardMaterial color={'rgb(110, 0, 215)'} />
      </mesh>
    </>
  );
}

export default About;