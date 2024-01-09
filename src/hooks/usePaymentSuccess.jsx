import axios from "axios";
import { useState, useEffect } from "react";

const usePaymentSuccess = (paymentType, orderId, paymentKey, amount) => {
  const [paymentResult, setPaymentResult] = useState({
    status: null,
    message: "",
  });
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiVer = "api/v1";

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${apiVer}/order/toss/success?paymentType=${paymentType}&orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`,
          { withCredentials: true }
        );
        setPaymentResult({
          status: response.status,
          message: response.data.message,
        });
      } catch (error) {
        console.error("Error fetching payment success:", error);
        setPaymentResult({
          status: "error",
          message: "결제 확인 중 오류가 발생했습니다.",
        });
      }
    };

    fetchPaymentResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentType, orderId, paymentKey, amount]);

  return paymentResult;
};

export default usePaymentSuccess;
