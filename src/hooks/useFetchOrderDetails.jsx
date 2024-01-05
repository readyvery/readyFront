import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";

const useFetchOrderDetails = (orderId) => {
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${apiVer}/order/receipt?orderId=${orderId}`,
          { withCredentials: true }
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
