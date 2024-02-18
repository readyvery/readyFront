import axios from "axios";
import useRequestZoreCostPayment from "./useRequestPaymentZeroCost";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/order/toss`;

const useRequestPayment = () => {
  const requestZoreCostPayment = useRequestZoreCostPayment();
  const requestPayment = async (cartId, couponId, paymentWidget) => {
    try {
      const body = { cartId, couponId };
      const response = await axios.post(apiUrl, body, {
        withCredentials: true,
      });

      if (response.data.amount <= 0) {
        const orderIds = response.data.orderId;
        const amounts = response.data.amount;
        requestZoreCostPayment({ orderId: orderIds, amount: amounts });
        return;
      }
      paymentWidget?.requestPayment(response.data);
      return;
    } catch (error) {
      console.error("Error during payment request:", error);
    }
  };

  return requestPayment;
};

export default useRequestPayment;
