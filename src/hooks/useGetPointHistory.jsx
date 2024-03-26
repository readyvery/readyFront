import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const apiUrl = `/point/history`;

// 포인트 내역 조회
const useGetPointHistory = () => {
  const token = localStorage.getItem("accessToken");
  const [isLoadingPointHistory, setIsLoadingPointHistory] = useState(true);
  const [pointHistory, setPointHistory] = useState([]);
  useEffect(() => {
    const fetchPointHistory = async () => {
      try {
        const res = await commonApis.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPointHistory(res.data.history);
      } catch (error) {
        console.error("Error fetching new order history:", error);
      } finally {
        setIsLoadingPointHistory(false);
      }
    };
    fetchPointHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { pointHistory, isLoadingPointHistory };
};

export default useGetPointHistory;
