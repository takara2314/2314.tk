import React, { useEffect, useRef, useState } from 'react';
import Base from './Base';

type FavoritesProps = {
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

const Favorites: React.FC<FavoritesProps> = (props: FavoritesProps) => {
  return (
    <Base {...props} />
  );
}

export default Favorites;