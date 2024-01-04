import { Link, useLocation } from "react-router-dom";
import menuDelete from "../../assets/images/menu_delete.svg";
import noImageMenu from "../../assets/images/no_image_menu.svg";
import empty from "../../assets/images/storage_empty.svg";
import Header from "../../components/views/Header/Header";
import "./CartPage.css";
import useFetchCartData from "../../hooks/useFetchCartData";
import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import useDeleteCartItem from "../../hooks/useDeleteCartItem";

const CartPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  const cartId = params.get("cartId");
  const [paymentData, setPaymentData] = useFetchCartData(cartId);
  const deleteCartItem = useDeleteCartItem();
  const updateCartItem = useUpdateCartItem();

  const handleDecrease = (item) => {
    if (item?.count > 1) {
      const newCount = item.count - 1;
      const updatedCarts = paymentData.carts.map((cartItem) =>
        cartItem.idx === item.idx ? { ...cartItem, count: newCount } : cartItem
      );
      setPaymentData({ ...paymentData, carts: updatedCarts });
      updateCartItem(item.idx, newCount, item.price); // PUT 요청
    }
  };

  const handleIncrease = (item) => {
    const newCount = item.count + 1;
    const updatedCarts = paymentData.carts.map((cartItem) =>
      cartItem.idx === item.idx ? { ...cartItem, count: newCount } : cartItem
    );
    setPaymentData({ ...paymentData, carts: updatedCarts });
    updateCartItem(item.idx, newCount, item.price); // PUT 요청
  };

  const handleRemoveItem = (itemId) => {
    deleteCartItem(itemId, paymentData, setPaymentData); // DELETE 요청
  };

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
          isClose: false,
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
                    src={item.imgUrl || noImageMenu}
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
                      src={menuDelete}
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
            src={empty}
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
