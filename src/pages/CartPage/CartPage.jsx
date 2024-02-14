import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import menuDelete from "../../assets/images/menu_delete.svg";
// import noImageMenu from "../../assets/images/no_image_menu.svg";
// import empty from "../../assets/images/storage_empty.svg";
import Header from "../../components/views/Header/Header";
import "./CartPage.css";

const CartPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  const cartId = params.get("cartId");
  const [paymentData, setPaymentData] = useState(null);
  const [price, setPrice] = useState(paymentData?.totalPrice);
  const [Count, setCount] = useState(1);
  const [Idx, setIdx] = useState(0);
  const apiRoot = process.env.REACT_APP_API_ROOT;

  const handleDecrease = (item) => {
    if (item?.count > 1) {
      const updatedCarts = paymentData.carts.map((cartItem) =>
        cartItem.idx === item.idx
          ? { ...cartItem, count: cartItem?.count - 1 }
          : cartItem
      );
      setPaymentData((prevData) => ({ ...prevData, carts: updatedCarts }));
      const newPrice = price - item.price;
      setPrice(newPrice);
      setCount(item?.count - 1);
      setIdx(item.idx);
    }
  };

  const handleIncrease = (item) => {
    const updatedCarts = paymentData.carts.map((cartItem) =>
      cartItem.idx === item.idx
        ? { ...cartItem, count: cartItem?.count + 1 }
        : cartItem
    );
    setPaymentData((prevData) => ({ ...prevData, carts: updatedCarts }));
    const newPrice = price + item.price;
    setPrice(newPrice);
    setCount(item?.count + 1);
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
        (total, cartItem) => total + cartItem.totalPrice * cartItem?.count,
        0
      );
      setPrice(newPrice);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiRoot}/api/v1/order/cart?cartId=${cartId}`,
          { withCredentials: true }
        );
        setPaymentData(response.data);
        setPrice(response.data.totalPrice);
      } catch (error) {
        console.error(error);
      }
    };

    const noneCartData = async () => {
      try {
        const response = await axios.get(`${apiRoot}/api/v1/order/cart`, {
          withCredentials: true,
        });
        setPaymentData(response.data);
        setPrice(response.data.totalPrice);
      } catch (error) {
        console.error(error);
      }
    };

    cartId ? fetchData() : noneCartData();
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

  const totalQuantity = paymentData?.carts.reduce(
    (total, item) => total + item.count,
    0
  );
  const totalPrice = paymentData?.carts.reduce(
    (total, item) => total + item.totalPrice * item.count,
    0
  );

  return (
    <div className="cart-page">
      <Header
        headerProps={{
          pageName: "장바구니",
          linkTo:
            !storeId ||
            isNaN(parseInt(storeId, 10)) ||
            !inout ||
            isNaN(parseInt(inout, 10))
              ? "/"
              : `/store?storeId=${storeId}&inout=${inout}`,
        }}
      />

      {paymentData && paymentData?.carts.length > 0 ? (
        <div className="cart-page__cart-content">
          <Link
            to={`/store?storeId=${paymentData?.storeId}&inout=${paymentData?.inOut}`}
            className="cart-page__cafe-info"
          >
            <img
              className="cart-page__cafe-info__img"
              src={paymentData?.imgUrl}
              alt="cafeImg"
            ></img>

            <text className="cart-page__cafe-info__name">
              {paymentData?.name}
            </text>
          </Link>

          <div className="cart-page__order-info">
            {paymentData?.carts.map((item) => (
              <div>
                <div className="cart-page__order-info__item">
                  <img
                    className="cart-page__order-info__item__img"
                    // src={item.imgUrl || noImageMenu}
                    alt="menuImg"
                  ></img>

                  <div>
                    <div className="cart-page__order-info__item__name">
                      {item.name}
                    </div>

                    <div className="cart-page__order-info__item__option">
                      {item.options.map((option) => (
                        <div key={option.optionId}>
                          •[{option.categoryName}] {option.name} (+
                          {option.price && option.price.totalPrice
                            ? option.price.totalPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
                            : "가격 없음"}
                          )
                        </div>
                      ))}
                    </div>

                    <div className="cart-page__order-info__item__price">
                      {(item?.totalPrice * item?.count)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
                    </div>
                  </div>

                  <div className="cart-page__order-info__item__control">
                    <img
                      className="cart-page__order-info__item__delete"
                      // src={menuDelete}
                      alt="X"
                      onClick={() => handleRemoveItem(item.idx)}
                    />

                    <div className="cart-page__order-info__item__count">
                      <span
                        className="cart-page__order-info__item__count-minus"
                        style={{
                          color: item?.count === 1 ? "#DADADA" : "#838383",
                        }}
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </span>
                      <span>{item?.count}</span>
                      <span
                        className="cart-page__order-info__item__count-plus"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>

                <div className="cart-page__order-info__item__line"></div>
              </div>
            ))}

            <Link
              className="cart-page__order-info__item__add"
              to={`/store?storeId=${paymentData?.storeId}&inout=${paymentData?.inOut}`}
              style={{ textDecoration: "none" }}
            >
              + 더 담으러 가기
            </Link>
          </div>

          {paymentData?.isOpened ? (
            <Link
              to={`/payment?storeId=${paymentData?.storeId}&inout=${paymentData?.inOut}&cartId=${paymentData?.cartId}`}
              className="cart-page__order-btn"
            >
              <span className="cart-page__total-quantity">{totalQuantity}</span>
              <span className="cart-page__order-text">주문하기</span>
              <span className="cart-page__total-price">
                {totalPrice &&
                  totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                    "원"}
              </span>
            </Link>
          ) : (
            <div className="cart-page__store-close">지금은 준비중입니다.</div>
          )}
        </div>
      ) : (
        <div className="cart-page__cart-empty">
          <img
            // src={empty}
            alt="empty cart"
            className="cart-page__cart-empty__img"
          />
          <span className="cart-page__cart-empty__text">
            장바구니가 비었습니다
          </span>
        </div>
      )}
    </div>
  );
};
export default CartPage;
