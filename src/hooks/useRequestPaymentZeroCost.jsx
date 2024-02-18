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
