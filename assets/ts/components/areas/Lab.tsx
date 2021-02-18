import React, { useEffect } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';

const Lab: React.FC<WorldProps> = (props: WorldProps) => {
  useEffect(() => {
    props.changeMemoName('lab');
  }, []);

  return (
    <Base {...props} />
  );
};

export default Lab;