import { useEffect } from "react";
import commonApis from "../utils/commonApis";

const useFetchPaymentFail = (message, orderId, code) => {
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    commonApis
      .get(
        `/order/toss/fail?message=${message}&orderId=${orderId}&code=${code}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error sending fail URL request:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, orderId, code]);
};

export default useFetchPaymentFail;
