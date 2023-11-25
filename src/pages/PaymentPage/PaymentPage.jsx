import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import menuDelete from "../../assets/images/menu_delete.svg";
import noImageMenu from "../../assets/images/no_image_menu.svg";
import Header from "../../components/views/Header/Header";
import "./PaymentPage.css";
// import takeIn from "../../assets/images/take_in.svg";
// import takeOut from "../../assets/images/take_out.svg";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import axios from "axios";

const clientKey = "test_ck_pP2YxJ4K87By0b4RZeo0rRGZwXLO";
const customerKey = "OSlBWOomTvjxwqJTcNtEB";

const PaymentPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [paymentData, setPaymentData] = useState(null);
  const [price, setPrice] = useState(paymentData?.totalPrice);
  const selectedCoupon = location.state?.selectedCoupon;

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
    (async () => {
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
        { value: price },
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
    })();
  }, [price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // 새로운 결제 금액을 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const paymentRequest = async () => {
    let body = {
      inout: inout,
      couponId: 12,
    };

    await axios
      .post(`${process.env.REACT_APP_API_ROOT}/api/v1/order/toss`, body, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);

        const paymentWidget = paymentWidgetRef.current;

        // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
        // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
        // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
        paymentWidget?.requestPayment(res.data);
      })

      // 여기에서 상태 업데이트 또는 다른 로직 수행 가능
      .catch((error) => {
        // 에러가 발생한 경우에 대한 로직
        console.error("Error resetting cart", error);
        // 에러 상태에 대한 처리를 수행하거나 사용자에게 알림 등을 표시할 수 있습니다.
      });
  };

  return (
    <div className="payment-page">
      <Header
        headerProps={{
          pageName: "주문결제",
          isClose: false,
          linkTo: `/cart?storeId=${storeId}&inout=${inout}`,
        }}
      />

      <div className="payment-page__cafe-info">
        <img
          className="payment-page__cafe-info__img"
          src={paymentData?.imgUrl}
          alt="cafeImg"
        ></img>

        <text className="payment-page__cafe-info__name">
          {paymentData?.name}
        </text>
      </div>

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
            </div>

            <div className="payment-page__order-info__item__line"></div>
          </div>
        ))}
      </div>

      <div className="payment-page__line"></div>

      <div className="payment-page__packaging-status">수령방식</div>

      <div className="payment-page__packaging-status__content"></div>

      <div id="payment-page__payment-widget" />
      <div id="payment-page__payment-agreement" />

      <div>
        <label>
          <input
            type="checkbox"
            onChange={(event) => {
              setPrice(event.target.checked ? price - 5000 : price + 5000);
            }}
          />
          5,000원 할인 쿠폰 적용
        </label>
      </div>

      <div className="payment-page__payment-btn" onClick={paymentRequest}>
        결제하기
      </div>
    </div>
  );
};
export default PaymentPage;
