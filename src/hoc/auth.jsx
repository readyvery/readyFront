import { message } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isAuthenticatedState,
  loginState
} from "../Atom/status";

function Auth(SpecificComponent, option) {
  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const location = useLocation();
    // const userInfo = useRecoilValue(getUserSelector);
    const setIsLoggedIn = useSetRecoilState(loginState);
    const [isAuth, setIsAuth] = useRecoilState(isAuthenticatedState);
    //const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
    const [cookies] = useCookies(["accessToken"]);

    useEffect(() => {
      // 성공시 해당 정보 반환
      const apiUrl = process.env.REACT_APP_API_ROOT;
      const config = {
        withCredentials: true,
      };
      axios.get(`${apiUrl}/api/v1/auth`, config)
        .then((res) => {
          // setUserInfo(res.data);
          console.log(res);
          if (!isAuth && cookies?.accessToken && location.pathname === "/") {
            // 첫 로그인 시
            setIsAuth(true);
            setIsLoggedIn({
              accessToken: getAccessTokenFromCookie(),
              expiredTime: moment().add(1, "hour").format("yyyy-MM-DD HH:mm:ss"),
            });
            message.success("로그인에 성공하셨습니다.");
            navigate("/"); //homepage
          } 
          else {
            if (cookies?.accessToken && location.pathname === "/kakaologin") {
              // 로그인 상태에서 로그인 화면으로 갔을 경우
              navigate("/"); // homepage
            }
          }
        }) 
        .catch((err) => {
          if(location.pathname !== "/kakaologin" && location.pathname !== "/"){
            navigate("/kakaologin");
          }
        })

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
