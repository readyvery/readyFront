import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import commonApis from "../utils/commonApis";

const apiUrl = `/order/history/fast`;

const useFetchQuickOrder = () => {
  const [cookies, , ] = useCookies(["accessToken"]);
  const [quickOrder, setQuickOrder] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      if (token || cookies?.accessToken) {
        try {
          const response = await commonApis.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token ? token : cookies?.accessToken}`
            }
          });
          setQuickOrder(response.data.receipts?.reverse());
        } catch (error) {
          console.error("Error fetching quick order data:", error);
        }
      } else {
        // isAuth가 false일 때 quickOrder 상태를 초기화합니다.
        setQuickOrder([]);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return quickOrder;
};

export default useFetchQuickOrder;
