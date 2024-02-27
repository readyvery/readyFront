import axios from "axios";
import { useEffect, useState } from "react";
import "./CartItemCount.css";
const CartItemCount = () => {
  const [count, setCount] = useState(0); // 장바구니 개수
  const apiRoot = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiRoot}/api/v1/order/cart/count`, {
          withCredentials: true,
        });
        setCount(response.data.count);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const err = error.response?.data.status;
          if (err === 404) {
            setCount(0);
          } else {
            console.error(error);
          }
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>{count === 0 ? null : <div className="cart-item-count">{count}</div>}</>
  );
};

export default CartItemCount;
