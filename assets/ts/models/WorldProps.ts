interface WorldProps {
  place:       string;
  changePlace: (name: string) => void;

  memoName:       string;
  changeMemoName: (name: string) => void;

  posX:       number;
  posY:       number;
  posZ:       number;
  changePosX: (x: number) => void;
  changePosY: (y: number) => void;
  changePosZ: (z: number) => void;

  isHover:         boolean;
  hoverPosX:       number;
  hoverPosY:       number;
  hoverPosZ:       number;
  changeIsHover:   (flag: boolean) => void;
  changeHoverPosX: (x: number) => void;
  changeHoverPosY: (y: number) => void;
  changeHoverPosZ: (z: number) => void;
}

export default WorldProps;