import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const apiUrl = `/point/history`;

// 포인트 내역 조회
const useGetPointHistory = () => {
  const token = localStorage.getItem("accessToken");
  const [pointHistory, setPointHistory] = useState([]);
    useEffect(() => {
        const fetchPointHistory = async () => {
            try {
                const res = await commonApis.get(apiUrl, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
                setPointHistory(res.data.history);
            } catch (error) {
                console.error("Error fetching new order history:", error);
            }
        };
        fetchPointHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return pointHistory;
};

export default useGetPointHistory;
