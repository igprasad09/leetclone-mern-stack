import { atom } from 'recoil';

export interface User {
  email: string;
  password: string;
};

export const userAtom = atom<User>({
  key: "userAtom",
  default: { email: "", password: "" },
});
