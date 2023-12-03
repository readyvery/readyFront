import { message } from "antd";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  getUserSelector,
  isAuthenticatedState
} from "../Atom/status";

function Auth(SpecificComponent, option) {
  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuth, setIsAuth] = useRecoilState(isAuthenticatedState);
    const userInfo = useRecoilValue(getUserSelector);
    console.log(isAuth);
    const [cookies] = useCookies(["accessToken"]);

    useEffect(() => {
      // 성공시 해당 정보 반환
      // const apiUrl = process.env.REACT_APP_API_ROOT;
      // const config = {
      //   withCredentials: true,
      // };
      console.log(userInfo);
        if(userInfo !== "404"){
          if (!isAuth && cookies?.accessToken && location.pathname === "/") {
            // 첫 로그인 시
            setIsAuth(true);
            message.success("로그인에 성공하셨습니다.");
          } 
          else {
            if (cookies?.accessToken && location.pathname === "/kakaologin") {
              // 로그인 상태에서 로그인 화면으로 갔을 경우
              navigate("/"); // homepage
            }
          }
        } else {
          if(location.pathname !== "/kakaologin" && location.pathname !== "/"){
            navigate("/kakaologin");
          }
        }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}

// accessToken을 cookie에서 가져오는 함수
export const getAccessTokenFromCookie = () => {
  const cookieString = document.cookie;
  if (cookieString) {
    const cookies = cookieString.split("; ");

    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "accessToken") {
        return value;
      }
    }
  }

  // accessToken만 받아와야하는데 지금은 다른 것도 받아오고 있어서 파싱해야함
  return null;
};

export default Auth;
