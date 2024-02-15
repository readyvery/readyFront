import axios from "axios";
const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrlBasic = `${apiRoot}/${apiVer}/order/toss/success?`;

const useRequestZoreCostPayment = () => {
  const zoreCostPaymentKey = "coupon";
  const requestZoreCostPayment = async ({ orderId, amount }) => {
    const apiUrl =
      apiUrlBasic +
      `paymentKey=${zoreCostPaymentKey}&` + 
      `orderId=${orderId}&` +
      `amount=${amount}`;
    try {
      const response = await axios.get(apiUrl, {
        withCredentials: true,
      });
      console.log(response.data);
      window.location.href = apiUrl;
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return requestZoreCostPayment;
};

export default useRequestZoreCostPayment;
