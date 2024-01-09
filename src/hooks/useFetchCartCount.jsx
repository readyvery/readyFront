import axios from "axios";
import { useEffect, useState } from "react";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/order/cart/count`;

const useFetchCartCount = () => {
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get(apiUrl, { withCredentials: true });
        setTotalCount(response.data.count);
      } catch (error) {
        console.error("장바구니 갯수 조회 중 오류 발생:", error);
      }
    };

    fetchCartCount();
  }, []);

  return totalCount;
};

export default useFetchCartCount;
