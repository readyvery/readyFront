import { Link, useLocation } from "react-router-dom";
import Header from "../../components/views/Header/Header";
import "./CartPage.css";
import { useEffect, useState } from "react";
import menuDelete from "../../assets/images/menu_delete.svg";
import noImageMenu from "../../assets/images/no_image_menu.svg";
import axios from "axios";

const CartPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  const [paymentData, setPaymentData] = useState(null);
  const [price, setPrice] = useState(paymentData?.totalPrice);
  const [Count, setCount] = useState(1);
  const [Idx, setIdx] = useState(0);
  const apiRoot = process.env.REACT_APP_API_ROOT;

  const handleDecrease = (item) => {
    if (item.count > 1) {
      const updatedCarts = paymentData.carts.map((cartItem) =>
        cartItem.idx === item.idx
          ? { ...cartItem, count: cartItem.count - 1 }
          : cartItem
      );
      setPaymentData((prevData) => ({ ...prevData, carts: updatedCarts }));
      const newPrice = price - item.price;
      setPrice(newPrice);
      setCount(item.count - 1);
      setIdx(item.idx);
    }
  };

  const handleIncrease = (item) => {
    const updatedCarts = paymentData.carts.map((cartItem) =>
      cartItem.idx === item.idx
        ? { ...cartItem, count: cartItem.count + 1 }
        : cartItem
    );
    setPaymentData((prevData) => ({ ...prevData, carts: updatedCarts }));
    const newPrice = price + item.price;
    setPrice(newPrice);
    setCount(item.count + 1);
    setIdx(item.idx);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // 서버에 아이템 삭제 요청 보내기
      await axios.delete(`${apiRoot}/api/v1/order/cart?idx=${itemId}`, {
        withCredentials: true,
      });

      // 로컬 상태 및 렌더링 갱신
      const updatedCarts = paymentData.carts.filter(
        (cartItem) => cartItem.idx !== itemId
      );
      setPaymentData({ ...paymentData, carts: updatedCarts });

      // 가격도 갱신
      const newPrice = updatedCarts.reduce(
        (total, cartItem) => total + cartItem.totalPrice * cartItem.count,
        0
      );
      setPrice(newPrice);
    } catch (error) {
      console.error(error);
    }
  };

  // const updateCartItem = (itemId, newPrice, cnt) => {
  //   axios
  //     .put(
  //       `${apiRoot}/api/v1/order/cart?idx=${itemId}&count=${cnt}`,
  //       { price: newPrice },
  //       { withCredentials: true }
  //     )
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/api/v1/order/cart?inout=${inout}`,
          { withCredentials: true }
        );
        setPaymentData(response.data);
        setPrice(response.data.totalPrice);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .put(
        `${apiRoot}/api/v1/order/cart?idx=${Idx}&count=${Count}`,
        { price: price },
        { withCredentials: true }
      )
      .catch((error) => {
        console.error(error);
      });
  }, [Idx, price, Count, apiRoot]);

  return (
    <div className="cart-page">
      <Header
        headerProps={{
          pageName: "장바구니",
          isClose: false,
          linkTo: `/store?storeId=${storeId}&inout=${inout}`,
        }}
      />
      <div className="payment-page__order-info">
        {paymentData?.carts.map((item) => (
          <div>
            <div className="payment-page__order-info__item">
              <img
                className="payment-page__order-info__item__img"
                src={item.imgUrl || noImageMenu}
                alt="menuImg"
              ></img>

              <div>
                <div className="payment-page__order-info__item__name">
                  {item.name}
                </div>

                <div className="payment-page__order-info__item__option">
                  {item.options.map((option) => (
                    <div>
                      •{option.name} (+{option.price}원)
                    </div>
                  ))}
                </div>

                <div className="payment-page__order-info__item__price">
                  {item.totalPrice * item.count}원
                </div>
              </div>

              <div className="payment-page__order-info__item__control">
                <img
                  className="payment-page__order-info__item__delete"
                  src={menuDelete}
                  alt="X"
                  onClick={() => handleRemoveItem(item.idx)}
                />

                <div className="payment-page__order-info__item__count">
                  <span
                    className="payment-page__order-info__item__count-minus"
                    style={{
                      color: item.count === 1 ? "#DADADA" : "#838383",
                    }}
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </span>
                  <span>{item.count}</span>
                  <span
                    className="payment-page__order-info__item__count-plus"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </span>
                </div>
              </div>
            </div>

            <div className="payment-page__order-info__item__line"></div>
          </div>
        ))}

        <Link
          className="payment-page__order-info__item__add"
          to={`/store?storeId=${storeId}&inout=${inout}`}
          style={{ textDecoration: "none" }}
        >
          + 더 담으러 가기
        </Link>
      </div>

      <Link
        to={`/payment?storeId=${storeId}&inout=${inout}&cartId=${paymentData?.cartId}`}
        style={{ display: "flex", textDecoration: "none" }}
      >
        <div className="payment-page__order-btn">주문하기</div>
      </Link>
    </div>
  );
};
export default CartPage;
