import { useEffect } from "react";
import axios from "axios";

const useFetchPaymentFail = (message, orderId, code) => {
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiVer = "api/v1";

  useEffect(() => {
    axios
      .get(
        `${apiRoot}/${apiVer}/order/toss/fail?message=${message}&orderId=${orderId}&code=${code}`,
        { withCredentials: true }
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
