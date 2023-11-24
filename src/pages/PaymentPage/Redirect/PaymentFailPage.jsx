import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentFailPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const message = params.get("message");
  const orderId = params.get("orderId");
  const code = params.get("code");
  const apiRoot = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    axios
      .get(
        `${apiRoot}/api/v1/order/toss/fail?message=${message}&orderId=${orderId}&code=${code}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending fail URL request:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Payment Fail</h1>
    </div>
  );
};
export default PaymentFailPage;
