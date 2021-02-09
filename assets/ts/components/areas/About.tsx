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

  // useEffect(() => {
  //   fetch('http://localhost:2314/public/areas/about.json')
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       setBlocks(
  //         loadBlocksByJSON(props, result)
  //       );
  //       setLoadState('OK');
  //     },
  //     (error) => {
  //       setLoadState('Error');
  //     }
  //   )
  // }, [props.place]);

  // useFrame(({camera}) => {
  //   controlsRef.current?.update();

  //   props.changePosX(camera.position.x);
  //   props.changePosY(camera.position.y);
  //   props.changePosZ(camera.position.z);
  // });

  return (
    <Base {...props} />
  );
}

export default About;