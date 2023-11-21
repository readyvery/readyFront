import { Link, useLocation } from "react-router-dom";
import Header from "../../components/views/Header/Header";
import "./style.css";

const CartPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");

  // const { cartItems, setCartItems } = useContext(CartContext);

  // const handleRemoveFromCart = (id) => {
  //   const newCartItems = cartItems.filter((item) => item.id !== id);
  //   setCartItems(newCartItems);
  // };

  return (
    <div className="cart-page">
      <Header
        headerProps={{
          pageName: "장바구니",
          isClose: false,
          linkTo: `/store?storeId=${storeId}&inout=${inout}`,
        }}
      />
      <Link
        to={`/payment?storeId=${storeId}&inout=${inout}`}
        style={{ display: "flex", textDecoration: "none" }}
      >
        <div className="order-btn">주문하기</div>
      </Link>
    </div>
  );
};
export default CartPage;
