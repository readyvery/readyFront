import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const useFetchOldOrderHistory = () => {
  const [isLoadingOldStorageList, setIsLoadingOldStorageList] = useState(true);
  const [oldStorageList, setOldStorageList] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOldOrderHistory = async () => {
      try {
        const response = await commonApis.get(`/order/history/old`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOldStorageList(response.data.receipts?.reverse());
      } catch (error) {
        console.error("Error fetching old order history:", error);
      } finally {
        setIsLoadingOldStorageList(false);
      }
    };

    fetchOldOrderHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { oldStorageList, isLoadingOldStorageList };
};

export default useFetchOldOrderHistory;
