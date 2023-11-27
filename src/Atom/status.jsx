import axios from "axios";
import { atom, selector } from "recoil";

// 현재 사용자가 인증되었는지 여부를 나타내는 상태
export const isAuthenticatedState = atom({
  key: "isAuthenticatedState",
  default: false, // 인증되지 않았다고 가정
});

// 현재 사용자의 인증 상태를 가져오거나 토글하는 selector
export const getAuthenticatedSelector = selector({
  key: "auth/get",
  get: async ({ get }) => {
    // 현재 isAuthenticatedState의 값을 가져옴
    return get(isAuthenticatedState);
  },

  set: ({ set }) => {
    // 현재 isAuthenticatedState의 값을 반전
    set(isAuthenticatedState, (currentValue) => !currentValue);
  },
});

// 사용자의 로그인 상태 및 토큰 정보를 저장하는 상태
export const loginState = atom({
  key: "loginState",
  default: {
    accessToken: null,
    expiredTime: null,
  },
});

// 사용자 정보를 저장하는 상태
export const userState = atom({
  key: "userState",
  dafault: null,
});

// 사용자 정보를 가져오는 selector
export const getUserSelector = selector({
  key: "user/get",
  get: async ({ get, set }) => {
    // 백엔드에서 사용자 정보 가져옴
    try {
      // 성공시 해당 정보 반환
      const apiUrl = process.env.REACT_APP_API_ROOT;
      const config = {
        withCredentials: true,
      };
      const response = await axios.get(`${apiUrl}/api/v1/auth`, config);
      const userData = response.data;
      // if (JSON.stringify(userState) !== JSON.stringify(userData)) {
      //   // 다르면 userInfo 업데이트
      //   // set(userState, userData);
      // }
      return userData;
    } catch (err) {
      // 실해시 404 반환
      // 에러처리
      return "404";
    }
  },

  set: ({ set }, newValue) => {
    // 가져온 사용자 정보 userState에 저장
    set(userState, newValue);
  },
});
