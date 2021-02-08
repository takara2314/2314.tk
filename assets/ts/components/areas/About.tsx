import React, { useEffect, useRef, useState } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, ReactThreeFiber, useFrame, useThree } from 'react-three-fiber';

const About: React.FC<WorldProps> = (props: WorldProps) => {
  return (
    <Base {...props} />
  );
}

export default About;