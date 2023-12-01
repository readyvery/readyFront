import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import americano from "../../assets/images/img_americano.svg";
import Header from "../../components/views/Header/Header";
import "./OrderDetail.css";

const OrderDetail = () => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");

  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const config = {
      withCredentials: true,
    };

    axios
      .get(`${apiUrl}/api/v1/order/receipt?orderId=${orderId}`, config)
      .then((res) => {
        console.log(res);
        setDetailData(res.data);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="detail-container">
      <Header
        headerProps={{
          pageName: "주문상세",
          isClose: true,
          linkTo: "/orderHistory",
        }}
      />
      <div className="detail-content__wrapper">
        <div className="detail-content">
          <div className="detail-scroll-content">
            <div className="detail-top__wrapper">
              {detailData?.orderStatus === "CANCEL" ? (
                <span className="detail-order-status fail">
                  주문 취소 (가게사정)
                </span>
              ) : (
                <span className="detail-order-status">주문 완료</span>
              )}
              <span className="detail-cafe-name">{detailData?.storeName}</span>
              <div className="detail-order__wrapper">
                <span>주문일시: {detailData?.orderTime}</span>
                <span>주문번호: {detailData?.orderId}</span>
                <span>가게전화: {detailData?.storePhone}</span>
              </div>
            </div>
            <div className="detail-line"></div>
            <div className="detail-middle__wrapper">
              {
                detailData?.cart?.carts?.map((e) => (
                  <div className="detail-order__box" key={e.idx}>
                    <div className="detail-order-left__box">
                      <div className="detail-menu-img__wrapper">
                        <img src={americano} alt="americano" />
                      </div>
                      <div className="detail-order-menu__wrapper">
                        <span className="detail-order-menu__title">{e.name}</span>
                        <div className="detail-order-menu-option__wrapper">
                        {e.options?.map((option, idx) => 
                        { if(idx !== e.options.length){
                            return (
                              <>
                              <span className="detail-order-menu-option">
                                {option.name}
                              </span>
                              <span className="detail-order-menu-option">/</span>
                            </>
                          )} else {
                            return (
                              <span className="detail-order-menu-option">
                                {e?.count}
                              </span>
                            )
                          }
                        })}
                        </div>
                      </div>
                    </div>
                    <div className="detail-order-right__box">
                      <span>{e.totalPrice.toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                      }원</span>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="detail-line"></div>
            <div className="detail-bottom__wrapper">
              <div className="detail-payment__box">
                <span className="detail-payment__title">총 결제금액</span>
                <span className="detail-payment-price">{detailData?.cart?.totalPrice.toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                      }원</span>
              </div>
              <div className="detail-payment__box">
                <span className="detail-payment__title">결제방법</span>
                <span className="detail-payment__txt">{detailData?.method}</span>
              </div>
            </div>
            <div className="detail-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
