// hooks/useLogout.js
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useLogout = (removeCookie, setIsAuth) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.get(`${apiRoot}/api/v1/user/logout`, {
        withCredentials: true,
      });
      console.log(response);
      removeCookie("accessToken", { domain: process.env.REACT_APP_DOMAIN });
      removeCookie("JSESSIONID", { domain: process.env.REACT_APP_DOMAIN });
      setIsAuth(false);
      message.success("로그아웃에 성공하셨습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      message.error("로그아웃 실패. 관리자에게 문의하세요.");
      navigate("/");
    }
  };

  return logout;
};

export default useLogout;
