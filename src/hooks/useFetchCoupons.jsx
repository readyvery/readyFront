import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/coupon`;

const useFetchCoupons = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        });
        setCoupons(response.data.coupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return coupons;
};

export default useFetchCoupons;
