import axios from "axios";
import { useState, useEffect } from "react";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/order/history/fast`;

const useFetchFastOrderHistory = () => {
  const [storageList, setStorageList] = useState([]);

  useEffect(() => {
    const fetchFastOrderHistory = async () => {
      try {
        const response = await axios.get(apiUrl, { withCredentials: true });
        setStorageList(response.data.receipts?.reverse());
      } catch (error) {
        console.error("Error fetching fast order history:", error);
      }
    };

    fetchFastOrderHistory();
  }, []);

  return storageList;
};

export default useFetchFastOrderHistory;
