import commonApis from "../utils/commonApis";

const apiUrl = `/order/cart/reset`;

const useResetCart = () => {
  const token = localStorage.getItem("accessToken");
  const resetCart = async () => {
    try {
      const response = await commonApis.delete(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      return response;
    } catch (error) {
      console.error("Error resetting cart:", error);
      throw error;
    }
  };

  return resetCart;
};

export default useResetCart;
