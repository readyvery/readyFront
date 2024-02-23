import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentFailPage.css";
import useFetchPaymentFail from "../../../hooks/useFetchPaymentFail";
import { IMAGES } from "../../../constants/images";

const PaymentFailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const message = params.get("message");
  const orderId = params.get("orderId");
  const code = params.get("code");
  useFetchPaymentFail(message, orderId, code);

  return (
    <div className="payment-fail-page">
      <img
        src={IMAGES.headerClose}
        alt="close"
        className="payment-fail-page__close"
        onClick={() => navigate(`/status`, { replace: true })}
      />

      <img
        src={IMAGES.berryGrey}
        alt="ReadyVery"
        className="payment-fail-page__berry"
      />

      <div className="payment-fail-page__title">결제 실패</div>

      <div className="payment-fail-page__notice">
        네트워크 및 통장 잔액를 확인해주세요
      </div>

      <div
        className="payment-fail-page__done"
        onClick={() => navigate(`/search`, { replace: true })}
      >
        다른 주문하러 가기
      </div>
    </div>
  );
};
export default PaymentFailPage;
