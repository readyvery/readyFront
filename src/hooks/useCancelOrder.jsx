import { message } from "antd";
import commonApis from "../utils/commonApis";

const apiUrl = `/order/toss/cancel`;

const useCancelOrder = () => {
  const token = localStorage.getItem("accessToken");

  const cancelOrder = async (orderId) => {
    try {
      const response = await commonApis.post(
        apiUrl,
        { orderId }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }
      );
      if (response.status === 200 && response.data.message === "취소 성공") {
        message.success("주문 취소되었습니다.");
      } else {
        message.error("주문 취소에 실패하였습니다.");
      }
    } catch (error) {
      console.error("주문 취소 중 오류 발생:", error);
      message.error("주문 취소 중 오류가 발생하였습니다.");
    }
  };

  return cancelOrder;
};

export default useCancelOrder;
