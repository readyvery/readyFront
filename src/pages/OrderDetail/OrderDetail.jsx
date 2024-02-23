import React from "react";
import { useLocation } from "react-router-dom";
import "./OrderDetail.css";
import Header from "../../components/views/Header/Header";
import useFetchOrderDetails from "../../hooks/useFetchOrderDetails";

const OrderDetail = () => {
  const location = useLocation();
  const { returnTo } = location.state || {};
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");
  const {
    cancelReason,
    cart,
    inout,
    // method,
    orderNumber,
    orderStatus,
    orderTime,
    salePrice,
    storeName,
    storePhone,
  } = useFetchOrderDetails(orderId);

  return (
    <div className="order_detail">
      <Header
        headerProps={{
          pageName: "주문상세",
          linkTo: returnTo,
        }}
      />

      <div className="order_detail__container">
        <div className="order_detail__info">
          {orderStatus === "CANCEL" ? (
            <span className="order_detail__fail">
              주문 취소 ({cancelReason?.split(",")[1]?.split("=")[1]})
              {/* {cancelReason === null ? (
              <span></span>
            ) : (
              <span>({cancelReason?.split(",")[1]?.split("=")[1]})</span>
            )} */}
            </span>
          ) : (
            <span className="order_detail__done">주문 완료</span>
          )}
          <div className="order_detail__store">{storeName}</div>

          <div className="order_detail__list">주문일시 : {orderTime}</div>
          <div className="order_detail__list">주문번호 : {orderNumber}</div>
          <div className="order_detail__list">가게전화 : {storePhone}</div>
          <div className="order_detail__list">
            수령방식 : {inout === 1 ? "매장" : "픽업"}
          </div>
        </div>

        <div className="order_detail__menu">
          {cart?.carts?.map((e) => (
            <div className="order_detail__menu_item" key={e.idx}>
              <img src={e.imgUrl} alt="menu img" />

              <span className="order_detail__menu_item__option">
                <div className="order_detail__menu_item__name">{e.name}</div>
                {e.options?.map((option, idx) => (
                  <>
                    {option.name}
                    {idx !== e.options?.length - 1 && <span>/</span>}
                  </>
                ))}
              </span>

              <span className="order_detail__menu_item__price">
                {e.totalPrice &&
                  e.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </span>
            </div>
          ))}
        </div>

        <div className="order_detail__price">
          <div className="order_detail__price_list">
            상품금액
            <span className="order_detail__price_value">
              {cart?.totalPrice
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </span>
          </div>

          <div className="order_detail__price_list">
            할인금액
            <span className="order_detail__price_value">
              {salePrice &&
                (salePrice === 0
                  ? 0
                  : `(-) ${
                      salePrice !== undefined &&
                      !isNaN(salePrice) &&
                      salePrice
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }`)}
              원
            </span>
          </div>

          <div className="order_detail__price_list">
            <span>총 결제금액</span>
            {salePrice !== undefined &&
              !isNaN(salePrice) &&
              (cart?.totalPrice - salePrice)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
