import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/views/Header/Header";
import "./OrderDetail.css";
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
    method,
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
          isClose: false,
          linkTo: returnTo,
        }}
      />
      <div className="detail-content__wrapper">
        <div className="detail-content">
          <div className="detail-top__wrapper">
            {orderStatus === "CANCEL" ? (
              <span className="detail-order-status fail">
                주문 취소
                {cancelReason === null ? (
                  <span></span>
                ) : (
                  <span>({cancelReason?.split(",")[1]?.split("=")[1]})</span>
                )}
              </span>
            ) : (
              <span className="detail-order-status">주문 완료</span>
            )}

            <span className="detail-cafe-name">{storeName}</span>

            <div className="detail-order__wrapper">
              <span>주문일시: {orderTime}</span>
              <span>주문번호: {orderNumber}</span>
              <span>결제방식: {method}</span>
              <span>가게전화: {storePhone}</span>
              <span>수령방식: {inout === 1 ? "매장" : "픽업"}</span>
            </div>
          </div>

          <div className="detail-line"></div>

          <div className="detail-middle__wrapper">
            {cart?.carts?.map((e) => (
              <div className="detail-order__box" key={e.idx}>
                <div className="detail-order-left__box">
                  <div className="detail-menu-img__wrapper">
                    <img src={e.imgUrl} alt="americano" with="" />
                  </div>

                  <div className="detail-order-menu__wrapper">
                    <span className="detail-order-menu__title">
                      {e.name} X {e.count}
                    </span>

                    <div className="detail-order-menu-option__wrapper">
                      {e.options?.map((option, idx) => (
                        <>
                          <span className="detail-order-menu-option">
                            [{option.categoryName}] {option.name}
                          </span>
                          {idx !== e.options?.length - 1 && (
                            <span className="detail-order-menu-option">/</span>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="detail-order-right__box">
                  <span>
                    {e.totalPrice &&
                      e.totalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="detail-line"></div>

          <div className="detail-bottom__wrapper">
            <div className="detail-payment__box">
              <span className="detail-payment__title">상품금액</span>
              <span className="detail-payment-price">
                {cart?.totalPrice
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </span>
            </div>

            <div className="detail-payment__box">
              <span className="detail-payment__title">할인금액</span>
              <span className="detail-payment-price">
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

            <div className="detail-payment__box">
              <span className="detail-payment__title">총 결제금액</span>
              <span className="detail-payment-price">
                {salePrice !== undefined &&
                  !isNaN(salePrice) &&
                  (cart?.totalPrice - salePrice)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </span>
            </div>
          </div>

          <div className="detail-line"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
