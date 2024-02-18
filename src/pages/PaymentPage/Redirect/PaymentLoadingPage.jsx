import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentLoadingPage.css";
import { IMAGES } from "../../../constants/images";
import usePaymentSuccess from "../../../hooks/usePaymentSuccess";
import axios from "axios";

const PaymentLoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentType = params.get("paymentType");
  const orderId = params.get("orderId");
  const paymentKey = params.get("paymentKey");
  const amount = params.get("amount");
  const { paymentStatus, paymentMessage } = usePaymentSuccess(
    paymentType,
    orderId,
    paymentKey,
    amount
  );

  if (paymentStatus === 400) {
    navigate(-1);
  } else if (paymentStatus === 200) {
    if (
      paymentMessage !== "Order is already end." ||
      paymentMessage !== "결제 성공."
    ) {
      navigate(`/payment/fail`);
    }
  }

  return (
    <div className="payment-success-page">
      <img src={IMAGES.payLoading} alt="loading" />
      <div className="payment-success-page__paying">결제 중</div>
      <div className="payment-success-page__notice">
        주문 진행사항은 [주문내역] 에서 확인 가능해요!
      </div>
    </div>
  );
};
export default PaymentLoadingPage;
