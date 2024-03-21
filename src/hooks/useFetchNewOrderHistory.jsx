import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const apiUrl = `/order/history/new`;

const useFetchNewOrderHistory = () => {
  const [newStorageList, setNewStorageList] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchNewOrderHistory = async () => {
      try {
        const response = await commonApis.get(apiUrl, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        setNewStorageList(response.data.receipts.reverse());
        // console.log('new receipt: ', response.data.receipts);
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
