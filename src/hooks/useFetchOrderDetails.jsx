import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useFetchOrderDetails = (orderId) => {
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          withCredentials: true,
        };
        const response = await axios.get(
          `${apiRoot}/api/v1/order/receipt?orderId=${orderId}`,
          config
        );
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (orderId) {
      fetchData();
    }
  }, [orderId]);

  return orderDetails;
};

export default useFetchOrderDetails;
