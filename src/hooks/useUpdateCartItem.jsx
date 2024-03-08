import commonApis from "../utils/commonApis";

const useUpdateCartItem = () => {
  const token = localStorage.getItem("accessToken");
  const updateCartItem = async (idx, count, price) => {
    try {
      await commonApis.put(
        `/order/cart?idx=${idx}&count=${count}`,
        { price: price }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return updateCartItem;
};

export default useUpdateCartItem;
