type NaviProps = {
  menu:                   string[][];
  place:                  string;
  changePlace:            (name: string) => void;
  isMenuShowMobile:       boolean;
  changeIsMenuShowMobile: (isShow: boolean) => void;
  innerHeight:            number;
}

export default NaviProps;