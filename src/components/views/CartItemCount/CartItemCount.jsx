import axios from "axios";
import { useEffect, useState } from "react";
import "./CartItemCount.css";
import { useNavigate } from "react-router-dom";
const CartItemCount = () => {
  const [count, setCount] = useState(0); // 장바구니 개수
  const token = localStorage.getItem("accessToken");
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiVer = "api/v1";
  const apiUrl = `${apiRoot}/${apiVer}/order/cart/count`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(apiUrl, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCount(response.data.count);
        } catch (error) {
          if (error.response.status === 404) {
            setCount(0);
          }
          console.log(error);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {count === 0 ? null : (
        <div className="cart-item-count" onClick={() => navigate(`/cart`)}>
          {count}
        </div>
      )}
    </>
  );
};

export default CartItemCount;
