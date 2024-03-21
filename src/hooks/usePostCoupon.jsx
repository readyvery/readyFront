import { message } from "antd";
import commonApis from "../utils/commonApis";

const apiUrl = `/coupon`;

const usePostCoupon = () => {
  const token = localStorage.getItem("accessToken");
  const postCoupon = async (
    couponCode,
    couponId,
    couponIssued,
    setCouponIssued
  ) => {
    if (couponIssued) {
      message.warning("쿠폰을 이미 받았어요!");
      return;
    }

    try {
      const response = await commonApis.post(
        apiUrl,
        { couponCode, couponId }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }
      );
      console.log(response);
      message.success("쿠폰 받기 완료!");
      setCouponIssued(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("쿠폰 받기에 실패했습니다.");
    }
  };

  return postCoupon;
};

export default usePostCoupon;
