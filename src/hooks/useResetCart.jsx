import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useResetCart = () => {
  const resetCart = async () => {
    try {
      const response = await axios.delete(
        `${apiRoot}/api/v1/order/cart/reset`,
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.error("Error resetting cart:", error);
      throw error;
    }
  };

  return resetCart;
};

export default useResetCart;
