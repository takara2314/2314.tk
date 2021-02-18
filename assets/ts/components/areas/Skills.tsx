import React, { useEffect, useRef, useState } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';

const Skills: React.FC<WorldProps> = (props: WorldProps) => {
  useEffect(() => {
    props.changeMemoName('skills');
  }, []);

  return (
    <Base {...props} />
  );
}

export default Skills;