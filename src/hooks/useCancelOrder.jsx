import axios from "axios";
import { message } from "antd";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useCancelOrder = () => {
  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.post(
        `${apiRoot}/api/v1/order/toss/cancel`,
        { orderId },
        { withCredentials: true }
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
