import axios from "axios";
import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 현재 사용자가 인증되었는지 여부를 나타내는 상태
export const isAuthenticatedState = atom({
  key: "isAuthenticatedState",
  default: false, // 인증되지 않았다고 가정
  effects_UNSTABLE: [persistAtom],
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
  effects_UNSTABLE: [persistAtom],
});

// 사용자의 로그인 상태 및 토큰 정보를 저장하는 상태
export const loginState = atom({
  key: "loginState",
  default: {
    accessToken: null,
    expiredTime: null,
  },
  effects_UNSTABLE: [persistAtom],
});

// 사용자 정보를 저장하는 상태
export const userState = atom({
  key: "userState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// 사용자 정보를 가져오는 selector
export const getUserSelector = selector({
  key: "getUserSelector",
  get: async ({ get, set }) => {
    // 백엔드에서 사용자 정보 가져옴
    try {
      // 성공시 해당 정보 반환
      const apiUrl = process.env.REACT_APP_API_ROOT;
      const config = {
        withCredentials: true,
      };
      const response = await axios.get(`${apiUrl}/api/v1/auth`, config)
      return response.data;
        
      } catch (error) {
        return "404";
      }
  },

  set: ({ set }, newValue) => {
    // 가져온 사용자 정보 userState에 저장
    set(userState, newValue);
  },
  effects_UNSTABLE: [persistAtom],
});
