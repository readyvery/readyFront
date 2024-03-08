// hooks/useDeleteAccount.js
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import commonApis from "../utils/commonApis";

const apiUrl = `/user/remove`;

const useDeleteAccount = (removeCookie, setIsAuth) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const deleteAccount = async () => {
    if(token){
      try {
        const response = await commonApis.get(apiUrl, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        console.log(response);
        localStorage.clear();
        setIsAuth(false);
        message.success("회원탈퇴에 성공하셨습니다.");
        navigate("/");
      } catch (error) {
        console.error("Error during account deletion:", error);
        message.error("회원탈퇴 실패. 관리자에게 문의하세요.");
        // navigate("/");
      }
    }
  };

  return deleteAccount;
};

export default useDeleteAccount;
