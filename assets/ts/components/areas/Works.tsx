import React, { useEffect, useRef, useState } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';

const Works: React.FC<WorldProps> = (props: WorldProps) => {
  return (
    <Base {...props} />
  );
}

export default Works;