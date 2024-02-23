import axios from "axios";
import { useEffect, useState } from "react";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/point/history`;

// 포인트 내역 조회
const useGetPointHistory = () => {
  const [pointHistory, setPointHistory] = useState([]);
    useEffect(() => {
        const fetchPointHistory = async () => {
            try {
                const res = await axios.get(apiUrl, { withCredentials: true });
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
