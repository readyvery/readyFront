import { useState, useEffect } from "react";
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useFetchCoupons = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${apiRoot}/api/v1/coupon`, {
          withCredentials: true,
        });
        setCoupons(response.data.coupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  return coupons;
};

export default useFetchCoupons;
