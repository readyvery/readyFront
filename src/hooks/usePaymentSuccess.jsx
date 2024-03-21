import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const usePaymentSuccess = (paymentType, orderId, paymentKey, amount) => {
  const token = localStorage.getItem("accessToken");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const response = await commonApis.get(
          `/order/toss/success?paymentType=${paymentType}&orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`,
          {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
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
