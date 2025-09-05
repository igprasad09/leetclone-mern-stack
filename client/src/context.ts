import { atom } from 'recoil';

export interface User {
  email: string;
  password: string;
};

interface newUser{
     username: string,
     email: string,
     password: string
}

export const userAtom = atom<User>({
  key: "userAtom",
  default: { email: "", password: "" },
});

export const newUserAtom = atom<newUser>({
    key:"newuser",
    default:{ username: "", email: "", password: ""}
})

export const otpAtom = atom({
  key: "otpAtom",
  default: ""
});

export const otpLoadingAtom = atom({
   key: "otpLoading",
   default: false
})