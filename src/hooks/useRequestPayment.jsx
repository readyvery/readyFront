import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/order/toss`;

const useRequestPayment = () => {
  const requestPayment = async (cartId, couponId, paymentWidget, point) => {
    try {
      const body = { cartId, couponId, point };
      const response = await axios.post(apiUrl, body, {
        withCredentials: true,
      });

      if (response.data.amount <= 0) {
        window.location.href =
          response.data.successUrl +
          `?paymentType=NORMAL&orderId=${response.data.orderId}&paymentKey=membership&amount=${response.data.amount}`;
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
