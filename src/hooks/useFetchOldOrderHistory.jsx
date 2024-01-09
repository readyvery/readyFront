import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";

const useFetchOldOrderHistory = () => {
  const [oldStorageList, setOldStorageList] = useState([]);

  useEffect(() => {
    const fetchOldOrderHistory = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/${apiVer}/order/history/old`,
          { withCredentials: true }
        );
        setOldStorageList(response.data.receipts?.reverse());
      } catch (error) {
        console.error("Error fetching old order history:", error);
      }
    };

    fetchOldOrderHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return oldStorageList;
};

export default useFetchOldOrderHistory;
