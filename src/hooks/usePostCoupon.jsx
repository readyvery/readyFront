import axios from "axios";
import { message } from "antd";

const apiRoot = process.env.REACT_APP_API_ROOT;

const usePostCoupon = () => {
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
      const response = await axios.post(
        `${apiRoot}/api/v1/coupon`,
        { couponCode, couponId },
        { withCredentials: true }
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
