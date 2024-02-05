import { Link, useLocation } from "react-router-dom";
import "./PaymentRedirectPage.css";
import useFetchPaymentFail from "../../../hooks/useFetchPaymentFail";

const PaymentFailPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const message = params.get("message");
  const orderId = params.get("orderId");
  const code = params.get("code");
  useFetchPaymentFail(message, orderId, code);

  return (
    <div className="payment-fail-page">
      <img
        src={paymentFail}
        alt="ReadyVery"
        className="payment-redirect-page__berry"
      />
      <div className="payment-redirect-page__title">결제 실패</div>
      <Link
        to={`/`}
        className="payment-fail-page__done"
        style={{ textDecoration: "none" }}
      >
        다른 주문하러 가기
      </Link>
    </div>
  );
};
export default PaymentFailPage;
