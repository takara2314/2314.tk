interface NaviProps {
  menu:                   string[][];
  place:                  string;
  changePlace:            (name: string) => void;
  isContact:              boolean;
  setIsContact:           (isContact: boolean) => void;
  isMenuShowMobile:       boolean;
  changeIsMenuShowMobile: (isShow: boolean) => void;
  innerHeight:            number;
}

export default NaviProps;