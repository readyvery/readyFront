import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentType = params.get("paymentType");
  const orderId = params.get("orderId");
  const paymentKey = params.get("paymentKey");
  const amount = params.get("amount");
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const navigate = useNavigate();

  useEffect(() => {
    // const successUrl = `${apiRoot}/api/v1/order/toss/success?paymentType=${paymentType}&orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`;

    if (orderId) {
      axios
        .get(
          `${apiRoot}/api/v1/order/toss/success?paymentType=${paymentType}&orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`,
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            navigate("/status");
          } else {
            navigate("/payment/failure");
          }
        })
        .catch((error) => {
          console.error("Error sending success URL request:", error);
        });
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Payment Success</h1>
    </div>
  );
};
export default PaymentSuccessPage;
