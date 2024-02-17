const apiHome = process.env.REACT_APP_HOME_URL;
const apiVer = "api/v1";
const apiUrlBasic = `${apiHome}/${apiVer}/order/toss/success?`;

const useRequestZoreCostPayment = () => {
  const zoreCostPaymentKey = "coupon";
  const requestZoreCostPayment = async ({ orderId, amount }) => {
    const apiUrl =
      apiUrlBasic +
      `paymentKey=${zoreCostPaymentKey}&` +
      `orderId=${orderId}&` +
      `amount=${amount}`;

    // http://localhost:3000/payment/success?paymentType=NORMAL&orderId=83a6173d-36dd-4a09-a6f5-a31e11cdfc9c&paymentKey=y0E4Dv5qpMGjLJoQ1aVZkPyEMdq9Arw6KYe2RNgOWznZb7Bm&amount=7500
    try {
      window.location.href = apiUrl;
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return requestZoreCostPayment;
};

export default useRequestZoreCostPayment;
