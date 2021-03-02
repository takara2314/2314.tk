import React, { useEffect } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';

const Skills = (props: WorldProps) => {
  useEffect(() => {
    props.changeMemoName('skills');
  }, []);

  return (
    <Base {...props} />
  );
}

export default Skills;