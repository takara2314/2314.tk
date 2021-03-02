import React, { useEffect } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';

const Favorites = (props: WorldProps) => {
  useEffect(() => {
    props.changeMemoName('favorites');
  }, []);

  return (
    <Base {...props} />
  );
}

export default Favorites;