import commonApis from "../utils/commonApis";

const apiUrl = `/order/cart`;

const useUpdateCart = () => {
  const token = localStorage.getItem("accessToken");
  const updateCart = async (body) => {
    try {
      const response = await commonApis.post(apiUrl, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
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
