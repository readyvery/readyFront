import axios from "axios";

const apiRoot = process.env.REACT_APP_API_ROOT;

const useUpdateCartItem = () => {
  const updateCartItem = async (idx, count, price) => {
    try {
      await axios.put(
        `${apiRoot}/api/v1/order/cart?idx=${idx}&count=${count}`,
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
