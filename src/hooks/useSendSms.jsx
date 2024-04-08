import { message } from "antd";
import commonApis from "../utils/commonApis";

// 인증번호 발송
const useSendSms = () => {
  const apiUrl = `/sms/send`;
  const token = localStorage.getItem("accessToken");
  const handleSendSms = async (phoneNumber, handleCheckSendSem) => {
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
        message.success("인증번호를 발송했습니다.");
        handleCheckSendSem(true);
      } else {
        message.error("인증번호를 발송에 실패했습니다.");
        handleCheckSendSem(false);
      }
    } catch (error) {
      console.log("통신에러", error);
      message.error("인증번호를 발송에 실패했습니다.");
      handleCheckSendSem(false);
    }
  };
  return { handleSendSms };
};
export default useSendSms;
