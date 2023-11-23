// ../hoc/auth.js

import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { accessTokenState, isAuthenticatedState } from "../recoil/authAtoms";

export default function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck() {
    const navigate = useNavigate();
    //const location = useLocation();
    //const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState); // 인증 상태 (로그인이 되어있으면 true, 아니면 false)
    //const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

    // TODO : 로그인 한 유저 AT 시간 재설정 (setIsAuthenticated(true) 진행

    // auth 기능
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_ROOT}/api/v1/auth`, {
          withCredentials: true,
        }) ///api/v1/auth
        .then((response) => {
          // 로그인 안한 유저
          if (!response.data.auth) {
            if (option) {
              navigate("/kakaologin", { replace: true });
            }
          } else {
            //respone.data.auth = true
            //로그인한 상태
            if (adminRoute && !response.data.admin) {
              //admin유저만
              navigate("/");
            } else {
              if (option === false) {
                navigate("/");
              }
            }
          }
        })
        .catch((error) => {
          navigate("/kakaologin", { replace: true });
        });
    }, [navigate]);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}

// // 액세스 토큰 쿠키에 저장하는 함수 만들기
// export const setAccessTokenCookie = (accessToken) => {
//   document.cookie = `accessToken=${accessToken}; path=/`;
// };

// // 쿠키에서 액세스 토큰을 읽어오는 함수
// export const getAccessTokenFromCookie = () => {
//   const cookieString = document.cookie;
//   if(cookieString){
//     const cookies = cookieString.split("; ");

//   for (const cookie of cookies) {
//     const [name, value] = cookie.split("=");
//     if (name === "accessToken") {
//       return value;
//     }
//   }
//   }

//  // accessToken만 받아와야하는데 지금은 다른 것도 받아오고 있어서 파싱해야함
//   return null;
// };
