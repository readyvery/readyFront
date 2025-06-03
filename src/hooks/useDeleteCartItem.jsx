import commonApis from "../utils/commonApis";


const useDeleteCartItem = () => {
  const token = localStorage.getItem("accessToken");

  const deleteCartItem = async (itemId, paymentData, setPaymentData) => {
    try {
      await commonApis.delete(`/order/cart?idx=${itemId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

      // 로컬 상태 갱신
      const updatedCarts = paymentData.carts?.filter(
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
