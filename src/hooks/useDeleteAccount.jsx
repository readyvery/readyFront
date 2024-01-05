// hooks/useDeleteAccount.js
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/user/remove`;

const useDeleteAccount = (removeCookie, setIsAuth) => {
  const navigate = useNavigate();

  const deleteAccount = async () => {
    try {
      const response = await axios.get(apiUrl, {
        withCredentials: true,
      });
      console.log(response);
      removeCookie("accessToken", { domain: process.env.REACT_APP_DOMAIN });
      removeCookie("JSESSIONID", { domain: process.env.REACT_APP_DOMAIN });
      setIsAuth(false);
      message.success("회원탈퇴에 성공하셨습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error during account deletion:", error);
      message.error("회원탈퇴 실패. 관리자에게 문의하세요.");
      navigate("/");
    }
  };

  return deleteAccount;
};

export default useDeleteAccount;
