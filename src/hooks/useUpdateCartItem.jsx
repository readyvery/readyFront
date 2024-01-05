import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";

const useUpdateCartItem = () => {
  const updateCartItem = async (idx, count, price) => {
    try {
      await axios.put(
        `${apiRoot}/${apiVer}/order/cart?idx=${idx}&count=${count}`,
        { price: price },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return updateCartItem;
};

export default useUpdateCartItem;
