import { atom } from "recoil";

// 지금은 홈화면 로그인 상태를 false로 두고 있습니다.
export const loginState = atom({
  key: "loginState",
  default: false,
});
