import commonApis from "../utils/commonApis";

// 인증번호 확인
const useAuthVerification = () => {
  const apiUrl = `/sms/verify`;
  const token = localStorage.getItem("accessToken");
  const handleAuthVerificationNumer = async (
    phoneNumber,
    verifyNumber,
    handleCheckInputNumber
  ) => {
    try {
      const response = await commonApis.post(
        apiUrl,
        {
          phoneNumber: phoneNumber,
          verifyNumber: verifyNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        handleCheckInputNumber(true);
      } else {
        handleCheckInputNumber(false);
      }
    } catch (error) {
      console.log("통신에러", error);
      handleCheckInputNumber(false);
    }
  };
  return { handleAuthVerificationNumer };
};
export default useAuthVerification;
