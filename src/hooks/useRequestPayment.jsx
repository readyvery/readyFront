import commonApis from "../utils/commonApis";

const apiUrl = `/order/toss`;

const useRequestPayment = () => {
  const token = localStorage.getItem("accessToken");
  const requestPayment = async (cartId, couponId, paymentWidget, paymentMethodsWidget, point) => {
    try {
      const body = { cartId, couponId, point };
      console.log('body: ', body);
      console.log('paymentWidget: ', paymentWidget.requestPayment);
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
      console.log('paymentMethodsWidget: ', paymentMethodsWidget);
      paymentMethodsWidget.updateAmount(
        Math.max(response.data.amount, 0)
      );

      paymentWidget?.requestPayment(response.data)
      .then(function (data) {return;})
      .catch(function (error) {
        if (error.code === 'NOT_SELECTED_PAYMENT_METHOD') {
          // 결제수단 미선택 오류
          const method = paymentMethodsWidget.getSelectedPaymentMethod();
          console.log('hook 내부 method: ', method);
          console.log('requestPayment error: ', error);
          alert('토스 페이먼츠 오류로 새로고침을 시도합니다');
          window.location.reload(true);
        }
      });
    } catch (error) {
      console.error("Error during payment request:", error);
    }
  };

  return requestPayment;
};

export default useRequestPayment;
