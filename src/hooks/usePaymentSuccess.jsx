import axios from "axios";
import { useState, useEffect } from "react";

const usePaymentSuccess = (paymentType, orderId, paymentKey, amount) => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState("");
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiVer = "api/v1";

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${apiVer}/order/toss/success?paymentType=${paymentType}&orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`,
          { withCredentials: true }
        );
        setPaymentStatus(response.status);
        setPaymentMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching payment success:", error);
        setPaymentStatus("error");
        setPaymentMessage("결제 확인 중 오류가 발생했습니다.");
      }
    };

    fetchPaymentResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentType, orderId, paymentKey, amount]);

  return { paymentStatus, paymentMessage };
};

export default usePaymentSuccess;
