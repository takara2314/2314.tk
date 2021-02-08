import React, { useEffect, useRef, useState } from 'react';
import Base from './Base';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, ReactThreeFiber, useFrame, useThree } from 'react-three-fiber';

type AboutProps = {
  posX: number;
  posY: number;
  posZ: number;
  changePosX: (x: number) => void;
  changePosY: (y: number) => void;
  changePosZ: (z: number) => void;

  isHover:   boolean;
  hoverPosX: number;
  hoverPosY: number;
  hoverPosZ: number;
  changeIsHover:   (flag: boolean) => void;
  changeHoverPosX: (x: number) => void;
  changeHoverPosY: (y: number) => void;
  changeHoverPosZ: (z: number) => void;
}

const About: React.FC<AboutProps> = (props: AboutProps) => {
  return (
    <Base {...props} />
  );
}

export default About;