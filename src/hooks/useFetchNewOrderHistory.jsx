import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useFetchNewOrderHistory = () => {
  const [newStorageList, setNewStorageList] = useState([]);

  useEffect(() => {
    const fetchNewOrderHistory = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/api/v1/order/history/new`,
          { withCredentials: true }
        );
        setNewStorageList(response.data.receipts);
      } catch (error) {
        console.error("Error fetching new order history:", error);
      }
    };

    fetchNewOrderHistory();
  }, []);

  return newStorageList;
};

export default useFetchNewOrderHistory;
