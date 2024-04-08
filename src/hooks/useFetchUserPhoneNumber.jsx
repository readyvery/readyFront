import { message } from "antd";
import { useNavigate } from "react-router-dom";
import commonApis from "../utils/commonApis";

// 인증번호 발송
const useFetchUserPhoneNumber = () => {
  const navigate = useNavigate();
  const apiUrl = `/sms/authority`;
  const token = localStorage.getItem("accessToken");
  const handleFetchUserPhoneNumber = async (phoneNumber) => {
    try {
      const response = await commonApis.post(
        apiUrl,
        {
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        message.success("전화번호 등록 성공했습니다.");
        navigate("/");
      } else {
        message.error("전화번호 등록 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      message.info("전화번호 등록에 실패하셨습니다.");
    }
  };
  return { handleFetchUserPhoneNumber };
};
export default useFetchUserPhoneNumber;
