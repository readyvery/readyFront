import { useEffect, useState } from "react";
import commonApis from "../../../utils/commonApis";
import "./CartItemCount.css";
const CartItemCount = () => {
  const [count, setCount] = useState(0); // 장바구니 개수
  const token = localStorage.getItem("accessToken");
  const apiUrl = `/order/cart/count`

  useEffect(() => {
    const fetchData = async () => {
      if(token){
        try {
          const response = await commonApis.get(
            apiUrl, 
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          setCount(response.data.count);
        } catch (error) {
          if(error.response.status === 404){
            setCount(0);
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
