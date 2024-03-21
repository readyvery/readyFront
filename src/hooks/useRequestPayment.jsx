import commonApis from "../utils/commonApis";

const apiUrl = `/order/toss`;

const useRequestPayment = () => {
  const token = localStorage.getItem("accessToken");
  const requestPayment = async (cartId, couponId, paymentWidget, point) => {
    try {
      const body = { cartId, couponId, point };
      const response = await commonApis.post(apiUrl, body,{
        headers: {
            Authorization: `Bearer ${token}`
        }
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
