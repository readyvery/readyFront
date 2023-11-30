import axios from "axios";
import { useEffect } from "react";
import "./PaymentRedirectPage.css";
import { useLocation } from "react-router-dom";
import paymentBerry from "../../../assets/images/payment_icon.png";
import { Link } from "react-router-dom";

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
    <div className="payment-fail-page">
      <img
        src={paymentBerry}
        alt="ReadyVery"
        className="payment-redirect-page__berry"
      />
      <div className="payment-redirect-page__title">결제 실패</div>
      <Link
        // to={`/cart?storeId=${storeId}&inout=${inout}`}
        to={`/`}
        className="payment-redirect-page__done"
        style={{ textDecoration: "none" }}
      >
        확인
      </Link>
    </div>
  );
};
export default PaymentFailPage;
