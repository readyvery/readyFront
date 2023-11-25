import americano from "../../assets/images/img_americano.svg";
import Header from "../../components/views/Header/Header";
import "./OrderDetail.css";

const OrderDetail = () => {
  const isCompelete = false;

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
              {isCompelete ? (
                <span className="detail-order-status fail">
                  주문 취소 (가게사정)
                </span>
              ) : (
                <span className="detail-order-status">주문 완료</span>
              )}
              <span className="detail-cafe-name">이디야커피 가톨릭대점</span>
              <div className="detail-order__wrapper">
                <span>주문일시: 2021년 12월 12일 18:06 (픽업)</span>
                <span>주문번호: B14102GXG9</span>
                <span>가게전화: 031-123-1234</span>
              </div>
            </div>
            <div className="detail-line"></div>
            <div className="detail-middle__wrapper">
              <div className="detail-order__box">
                <div className="detail-order-left__box">
                  <div className="detail-menu-img__wrapper">
                    <img src={americano} alt="americano" />
                  </div>
                  <div className="detail-order-menu__wrapper">
                    <span className="detail-order-menu__title">아메리카노</span>
                    <span className="detail-order-menu-option">
                      ICE / LARGE / 1
                    </span>
                    <span className="detail-order-menu-option">샷추가</span>
                  </div>
                </div>
                <div className="detail-order-right__box">
                  <span>3,500원</span>
                </div>
              </div>

              <div className="detail-order__box">
                <div className="detail-order-left__box">
                  <div className="detail-menu-img__wrapper">
                    <img src={americano} alt="americano" />
                  </div>
                  <div className="detail-order-menu__wrapper">
                    <span className="detail-order-menu__title">아메리카노</span>
                    <span className="detail-order-menu-option">
                      ICE / LARGE / 1
                    </span>
                  </div>
                </div>
                <div className="detail-order-right__box">
                  <span>3,500원</span>
                </div>
              </div>

              <div className="detail-order__box">
                <div className="detail-order-left__box">
                  <div className="detail-menu-img__wrapper">
                    <img src={americano} alt="americano" />
                  </div>
                  <div className="detail-order-menu__wrapper">
                    <span className="detail-order-menu__title">아메리카노</span>
                    <span className="detail-order-menu-option">
                      ICE / LARGE / 1
                    </span>
                  </div>
                </div>
                <div className="detail-order-right__box">
                  <span>3,500원</span>
                </div>
              </div>

              <div className="detail-order__box">
                <div className="detail-order-left__box">
                  <div className="detail-menu-img__wrapper">
                    <img src={americano} alt="americano" />
                  </div>
                  <div className="detail-order-menu__wrapper">
                    <span className="detail-order-menu__title">아메리카노</span>
                    <span className="detail-order-menu-option">
                      ICE / LARGE / 1
                    </span>
                  </div>
                </div>
                <div className="detail-order-right__box">
                  <span>3,500원</span>
                </div>
              </div>

              <div className="detail-order__box">
                <div className="detail-order-left__box">
                  <div className="detail-menu-img__wrapper">
                    <img src={americano} alt="americano" />
                  </div>
                  <div className="detail-order-menu__wrapper">
                    <span className="detail-order-menu__title">아메리카노</span>
                    <span className="detail-order-menu-option">
                      ICE / LARGE / 1
                    </span>
                  </div>
                </div>
                <div className="detail-order-right__box">
                  <span>3,500원</span>
                </div>
              </div>
              <div className="detail-order__box">
                <div className="detail-order-left__box">
                  <div className="detail-menu-img__wrapper">
                    <img src={americano} alt="americano" />
                  </div>
                  <div className="detail-order-menu__wrapper">
                    <span className="detail-order-menu__title">아메리카노</span>
                    <span className="detail-order-menu-option">
                      ICE / LARGE / 1
                    </span>
                  </div>
                </div>
                <div className="detail-order-right__box">
                  <span>3,500원</span>
                </div>
              </div>
            </div>
            <div className="detail-line"></div>
            <div className="detail-bottom__wrapper">
              <div className="detail-payment__box">
                <span className="detail-payment__title">총 결제금액</span>
                <span className="detail-payment-price">22,500원</span>
              </div>
              <div className="detail-payment__box">
                <span className="detail-payment__title">결제방법</span>
                <span className="detail-payment__txt">주문취소</span>
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
