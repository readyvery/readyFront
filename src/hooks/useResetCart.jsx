import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/order/cart/reset`;

const useResetCart = () => {
  const resetCart = async () => {
    try {
      const response = await axios.delete(apiUrl, {
        withCredentials: true,
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
