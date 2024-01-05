import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useFetchQuickOrder = (isAuth) => {
  const [quickOrder, setQuickOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuth) {
        try {
          const response = await axios.get(
            `${apiRoot}/api/v1/order/history/fast`,
            { withCredentials: true }
          );
          setQuickOrder(response.data.receipts?.reverse());
        } catch (error) {
          console.error("Error fetching quick order data:", error);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return quickOrder;
};

export default useFetchQuickOrder;
