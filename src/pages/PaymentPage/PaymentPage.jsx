import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/views/Header/Header";
import { IMAGES } from "../../constants/images";
import useFetchCartData from "../../hooks/useFetchCartData";
import useGetPoint from "../../hooks/useGetPoint";
import useRequestPayment from "../../hooks/useRequestPayment";
import "./PaymentPage.css";

const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;
const customerKey = "OSlBWOomTvjxwqJTcNtEB";

const PaymentPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cartId = params.get("cartId");
  const couponId = location.state?.selectedCoupon ?? null;
  const salePrice = location.state?.salePrice ?? 0;
  const [usedPoint, setUsedPoint] = useState(0);
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const { carts, edit, imgUrl, inOut, isOpened, name, storeId, totalPrice } =
    useFetchCartData(cartId);
  const requestPayment = useRequestPayment();
  const point = useGetPoint();
  const paymentRequest = () => {
    const paymentWidget = paymentWidgetRef.current;
    requestPayment(cartId, couponId, paymentWidget, usedPoint);
  };
  const handleSetPoint = () => {
    if (usedPoint !== 0) {
      setUsedPoint(0);
      return;
    }
    const MiddleSumPrice = totalPrice - salePrice;
    if (MiddleSumPrice <= 0) {
      setUsedPoint(0);
    } else {
      setUsedPoint(Math.min(point, MiddleSumPrice));
    }
  };
  useEffect(() => {
    (async () => {
      try {
        // ------  결제위젯 초기화 ------
        // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
        const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
        // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS)  // 비회원 결제

        // ------  결제 UI 렌더링 ------
        // 결제 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
        // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
        // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
          "#payment-page__payment-widget",
          { value: Math.max(totalPrice - salePrice - usedPoint, 0) },

          // 렌더링하고 싶은 결제 UI의 variantKey
          // 아래 variantKey는 문서용 테스트키와 연동되어 있습니다. 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
          // https://docs.tosspayments.com/guides/payment-widget/admin#멀티-결제-ui
          { variantKey: "DEFAULT" }
        );

        // ------  이용약관 UI 렌더링 ------
        // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
        // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
        paymentWidget.renderAgreement(
          "#payment-page__payment-agreement",
          { variantKey: "AGREEMENT" } // 기본 이용약관 UI 렌더링
        );
        paymentWidgetRef.current = paymentWidget;
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
      } catch (error) {
        alert(error.message);
        // 여기서는 오류를 콘솔에 로그로 남깁니다.
        // 필요에 따라 사용자에게 피드백을 주거나 다른 오류 처리 동작을 추가할 수 있습니다.
      }
    })();
  }, [totalPrice, salePrice, usedPoint]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // 새로운 결제 금액을 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(
      Math.max(totalPrice - salePrice - usedPoint, 0)
    );
  }, [totalPrice, salePrice, usedPoint]);

  return (
    <div className="payment-page">
      <Header
        headerProps={{
          pageName: "주문결제",
          linkTo: !edit ? "/" : `/cart?storeId=${storeId}&inout=${inOut}`,
        }}
      />

      <div className="payment-page__cafe-info">
        <img
          className="payment-page__cafe-info__img"
          src={imgUrl}
          alt="cafeImg"
        ></img>

        <text className="payment-page__cafe-info__name">{name}</text>
      </div>

      <div className="payment-page__order-info">
        {carts.map((item) => (
          <div>
            <div className="payment-page__order-info__item">
              <img
                className="payment-page__order-info__item__img"
                src={item.imgUrl || IMAGES.cartItemImgNull}
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
                  {(item.totalPrice * item.count)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </div>
              </div>

              <div className="payment-page__order-info__item__count">
                {item?.count}
              </div>
            </div>

            <div className="payment-page__order-info__item__line"></div>
          </div>
        ))}
      </div>

      <div className="payment-page__line"></div>

      <div className="payment-page__packaging-status">
        <div className="payment-page__title">수령방식</div>

        <div className="payment-page__packaging-status__container">
          {inOut === 1 ? (
            <>
              <img
                className="payment-page__packaging-status__img"
                src={IMAGES.takeIn}
                alt="Take In"
              />
              <span>먹고갈게요</span>
            </>
          ) : inOut === 2 ? (
            <>
              <img
                className="payment-page__packaging-status__img"
                src={IMAGES.takeOut}
                alt="Take Out"
              />
              <span>가져갈게요</span>
            </>
          ) : null}
        </div>
      </div>

      <div className="payment-page__line"></div>

      <div id="payment-page__payment-widget" />
      <div id="payment-page__payment-agreement" />

      <div className="payment-page__line"></div>

      <div className="payment-page__pay-info">
        <div className="payment-page__title">할인적용</div>
        <div className="payment-page__coupone">
          <span className="payment-page__content">쿠폰</span>
          <span className="payment-page__coupone__apply">
            <span className="payment-page__coupone-price">
              {salePrice && (
                <span className="payment-page__coupone-price">
                  {salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                </span>
              )}
              <Link
                to={`/coupon?storeId=${storeId}&inout=${inOut}&cartId=${cartId}`}
                className="payment-page__coupone-btn"
                style={{ textDecoration: "none" }}
              >
                쿠폰적용
              </Link>
            </span>
          </span>
        </div>
        <div className="payment-page__point">
          {/* 포인트 적용 */}
          <span className="payment-page__content">통합 포인트</span>
          <span className="payment-page__coupone__apply">
            <span className="payment-page__coupone-price">
              {usedPoint && (
                <span className="payment-page__coupone-price">
                  {usedPoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                </span>
              )}
              {/* 적용취소, 적용 금액 한계 설정 */}
              <div
                className="payment-page__coupone-btn"
                style={{ textDecoration: "none" }}
                onClick={handleSetPoint}
              >
                {usedPoint === 0 ? "최대 적용" : "적용 취소"}
              </div>
            </span>
          </span>
        </div>
        <div className="payment-page__point__available">
          <span>보유: {point} P</span>
        </div>
        <div className="payment-page__order-info__pay__line"></div>

        <div className="payment-page__title">결제금액</div>
        <div className="payment-page__productAmount">
          <span className="payment-page__content">상품금액</span>
          <span className="payment-page__content-price">
            {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
          </span>
        </div>

        <div className="payment-page__discountAmount">
          <span className="payment-page__content">할인금액</span>
          <span className="payment-page__content-price">
            {salePrice + usedPoint > 0
              ? "(-)" +
              // 표시되는 할인 금액 조정
                Math.min(salePrice + usedPoint, totalPrice)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                "원"
              : "0원"}
          </span>
        </div>

        <div className="payment-page__order-info__pay__line"></div>

        <div className="payment-page__payment">
          <span className="payment-page__title">총 결제 금액</span>
          <span className="payment-page__total-price">
            {totalPrice &&
              Math.max(totalPrice - salePrice - usedPoint, 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
          </span>
        </div>

        <div className="payment-page__notice">
          주문 승인 후, 취소 및 추가 주문이 불가합니다.
        </div>
      </div>

      {isOpened ? (
        <div className="payment-page__payment-btn" onClick={paymentRequest}>
          결제하기
        </div>
      ) : (
        <div className="payment-page__store-close">지금은 준비중입니다.</div>
      )}
    </div>
  );
};
export default PaymentPage;
