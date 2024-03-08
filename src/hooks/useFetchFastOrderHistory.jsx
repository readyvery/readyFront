import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const apiUrl = `/order/history/fast`;

const useFetchFastOrderHistory = () => {
  const [storageList, setStorageList] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchFastOrderHistory = async () => {
      try {
        const response = await commonApis.get(apiUrl, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        setStorageList(response.data.receipts?.reverse());
      } catch (error) {
        console.error("Error fetching fast order history:", error);
      }
    };

    fetchFastOrderHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return storageList;
};

export default useFetchFastOrderHistory;
