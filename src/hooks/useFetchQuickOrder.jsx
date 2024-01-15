import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/order/history/fast`;

const useFetchQuickOrder = (isAuth) => {
  const [quickOrder, setQuickOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuth) {
        try {
          const response = await axios.get(apiUrl, { withCredentials: true });
          setQuickOrder(response.data.receipts?.reverse());
          console.log(isAuth);
        } catch (error) {
          console.log("isAuth0" + isAuth);
          console.error("Error fetching quick order data:", error);
        }
      } else {
        // isAuth가 false일 때 quickOrder 상태를 초기화합니다.
        console.log(isAuth);

        setQuickOrder([]);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return quickOrder;
};

export default useFetchQuickOrder;
