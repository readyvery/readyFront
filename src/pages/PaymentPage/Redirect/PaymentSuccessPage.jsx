import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import "./PaymentRedirectPage.css";
import paymentBerry from "../../../assets/images/payment_icon.png";
import { Link } from "react-router-dom";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentType = params.get("paymentType");
  const orderId = params.get("orderId");
  const paymentKey = params.get("paymentKey");
  const amount = params.get("amount");
  const apiRoot = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    axios
      .get(
        `${apiRoot}/api/v1/order/toss/success?paymentType=${paymentType}&orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending success URL request:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="payment-success-page">
      <img
        src={paymentBerry}
        alt="ReadyVery"
        className="payment-redirect-page__berry"
      />
      <div className="payment-redirect-page__title">주문현황 확인</div>
      <Link
        to={`/orderHistory?orderId=${orderId}`}
        className="payment-redirect-page__done"
        style={{ textDecoration: "none" }}
      >
        확인
      </Link>
    </div>
  );
};
export default PaymentSuccessPage;
