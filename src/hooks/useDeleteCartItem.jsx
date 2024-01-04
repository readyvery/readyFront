// hooks/useDeleteCartItem.js
import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useDeleteCartItem = () => {
  const deleteCartItem = async (itemId, paymentData, setPaymentData) => {
    try {
      await axios.delete(`${apiRoot}/api/v1/order/cart?idx=${itemId}`, {
        withCredentials: true,
      });

      // 로컬 상태 갱신
      const updatedCarts = paymentData.carts.filter(
        (cartItem) => cartItem.idx !== itemId
      );
      setPaymentData({ ...paymentData, carts: updatedCarts });
    } catch (error) {
      console.error(error);
    }
  };

  return deleteCartItem;
};

export default useDeleteCartItem;
