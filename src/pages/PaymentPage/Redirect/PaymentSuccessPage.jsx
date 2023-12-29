import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import paymentSuccess from "../../../assets/images/payment_success.png";
import "./PaymentRedirectPage.css";
import Modal from "../../../components/views/Modal/Modal";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentType = params.get("paymentType");
  const orderId = params.get("orderId");
  const paymentKey = params.get("paymentKey");
  const amount = params.get("amount");
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleCancle = async () => {
    setIsOpen((prev) => !prev);
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get(
        `${apiRoot}/api/v1/order/toss/success?paymentType=${paymentType}&orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 400) {
          navigate(-1);
        } else if (response.status === 200) {
          if (
            response.message !== "Order is already end." ||
            response.message !== "결제 성공."
          ) {
            isOpen && (
              <Modal
                setIsOpen={setIsOpen}
                handleCancle={handleCancle}
                title={"결제 실패"}
                subtitle={response.message}
              />
            );
          }
        }
      })
      .catch((error) => {
        console.error("Error sending success URL request:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="payment-success-page">
      <img
        src={paymentSuccess}
        alt="ReadyVery"
        className="payment-redirect-page__berry"
      />
      <div className="payment-redirect-page__title">결제 완료!</div>
      <Link
        to={`/status?orderId=${orderId}`}
        className="payment-success-page__done"
        style={{ textDecoration: "none" }}
      >
        주문현황 확인
      </Link>
    </div>
  );
};
export default PaymentSuccessPage;
