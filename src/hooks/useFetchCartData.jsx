// 장바구니 확인
import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useFetchCartData = (cartId) => {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = cartId
          ? `${apiRoot}/api/v1/order/cart?cartId=${cartId}`
          : `${apiRoot}/api/v1/order/cart`;
        const response = await axios.get(apiUrl, { withCredentials: true });
        setPaymentData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [cartId]);

  return [paymentData, setPaymentData];
};

export default useFetchCartData;
