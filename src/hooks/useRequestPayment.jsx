import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/order/toss`;

const useRequestPayment = () => {
  const requestPayment = async (cartId, couponId, paymentWidget) => {
    try {
      const body = { cartId, couponId };
      const response = await axios.post(apiUrl, body, {
        withCredentials: true,
      });
      paymentWidget?.requestPayment(response.data);
    } catch (error) {
      console.error("Error during payment request:", error);
      // 에러 처리 로직
    }
  };

  return requestPayment;
};

export default useRequestPayment;
