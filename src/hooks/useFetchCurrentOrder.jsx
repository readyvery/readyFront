import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";

const useFetchCurrentOrder = (orderId, refreshKey) => {
  const [orderStatus, setOrderStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${apiVer}/order/current?orderId=${orderId}`,
          { withCredentials: true }
        );
        setOrderStatus(response.data);
      } catch (error) {
        console.error("Error fetching current order status:", error);
      }
    };

    fetchData();
  }, [orderId, refreshKey]); // refreshKey를 의존성 배열에 추가

  return orderStatus;
};

export default useFetchCurrentOrder;
