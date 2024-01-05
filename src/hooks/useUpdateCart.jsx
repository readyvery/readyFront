import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/order/cart`;

const useUpdateCart = () => {
  const updateCart = async (body) => {
    try {
      const response = await axios.post(apiUrl, body, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Error updating cart:", error);
      throw error;
    }
  };

  return updateCart;
};

export default useUpdateCart;
