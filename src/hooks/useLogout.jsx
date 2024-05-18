import { message } from "antd";
import { useNavigate } from "react-router-dom";
import commonApis from "../utils/commonApis";

const useLogout = (removeCookie, setIsAuth) => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const logout = async () => {
    if(token){
      try {
        const response = await commonApis.get(`/user/logout`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        if(response.status === 200){
          localStorage.clear();
          setIsAuth(false);
          message.success("로그아웃에 성공하셨습니다.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error during logout:", error);
        message.error("로그아웃 실패. 관리자에게 문의하세요.");
        navigate("/");
      }
    }
  };

  return logout;
};

export default useLogout;
