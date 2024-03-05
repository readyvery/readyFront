import axios from "axios";
import { useEffect, useState } from "react";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/order/history/new`;

const useFetchNewOrderHistory = () => {
  const [newStorageList, setNewStorageList] = useState([]);

  useEffect(() => {
    const fetchNewOrderHistory = async () => {
      try {
        const response = await axios.get(apiUrl, { withCredentials: true });
        setNewStorageList(response.data.receipts.reverse());
      } catch (error) {
        console.error("Error fetching new order history:", error);
      }
    };

    fetchNewOrderHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return newStorageList;
};

export default useFetchNewOrderHistory;
