import axios from "axios";
import { useEffect, useState } from "react";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/order/cart/count`;

const useFetchCartCount = () => {
  const [totalCount, setTotalCount] = useState(0);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTotalCount(response.data.count);
      } catch (error) {
        if(error.response.status === 404){
          setTotalCount(0);
        }
        console.log(error);
      }
    };

    fetchCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return totalCount;
};

export default useFetchCartCount;
