import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const apiUrl = `/coupon`;

const useFetchCoupons = () => {
  const [coupons, setCoupons] = useState(null); // null || []
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await commonApis.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
