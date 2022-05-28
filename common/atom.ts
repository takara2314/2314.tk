import { atom } from 'recoil';

export const user = atom<string>({
  key: 'user',
  default: 'user'
});
