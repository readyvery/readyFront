import { message } from "antd";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isAuthenticatedState } from "../Atom/status";
import commonApis from "../utils/commonApis";

function Auth(SpecificComponent, option) {
  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies(["accessToken"]);
    const setIsAuth = useSetRecoilState(isAuthenticatedState)
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
      function fetchAuth() {
        commonApis.get("/auth", {
            // headers: {
            //     Authorization: `Bearer ${token.accessToken}`
            // },
            withCredentials: true
        }).then((response) => {
            console.log(response);
            const { auth } = response.data; // 로그인 여부
            const { role } = response.data; // GUEST, USER, CEO
            console.log(auth, role, option);
          console.log(cookies?.accessToken);
          if (cookies.accessToken && auth && !token) {
            // 로그인 후 첫 접속
            console.log('auth에서 첫 접속: ', cookies.accessToken);
            localStorage.setItem("accessToken", cookies.accessToken); // 로컬 스토리지에 AT 저장
            setIsAuth(true); // 로그인 여부 변경
            message.success("로그인에 성공하셨습니다.");
            removeCookie("accessToken"); // AT 쿠키 삭제
          }
          if (!auth) {
            // 로그인 안 되어 있는 경우
            setIsAuth(false);
            if(option){
              navigate('/login');
              return;
            }
          }
          else {
            // 로그인이 된 경우
            if(role === 'GUEST'){
              // 번호인증 안 한 유저
              navigate('/authentication');
              return;
            }
            if(!option){
              navigate('/');
              return;
            }
          }}).catch((error) => {
            console.log(error);
            if (
                error.response &&
                error.response?.status >= 400 &&
                error.response?.status < 500
            ) {
                // 클라이언트 오류 발생 (400번대 오류)
                // 로그인 페이지로 되돌아가는 조건문 추가
                // navigate('/login');
            } else {
                // 서버 오류 또는 네트워크 오류 등의 다른 오류 처리
            }
          })
      }
      fetchAuth();
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
