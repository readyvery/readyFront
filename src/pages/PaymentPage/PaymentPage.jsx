import Header from "../../components/views/Header/Header";
import "./style.css";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import noImageMenu from "../../assets/images/no_image_menu.svg";

const PaymentPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");

  const paymentData = {
    name: "카페 오르다",
    imgUrl: "/주소",
    carts: [
      {
        idx: 141, // 장바구니 idx
        name: "아메리카노",
        imgUrl: "/주주소소",
        price: 2500,
        count: 4,
        options: [
          {
            idx: 1, // 옵션 테이블 인덱스
            name: "ICE",
          },
          {
            idx: 114, // 옵션 테이블 인덱스
            name: "샷추가",
          },
        ],
      },
      {
        idx: 143, // 장바구니 idx
        name: "카페라떼",
        imgUrl: null,
        price: 4500,
        count: 3,
        options: [
          {
            idx: 1, // 옵션 테이블 인덱스
            name: "ICE",
          },
          {
            idx: 114, // 옵션 테이블 인덱스
            name: "샷추가",
          },
        ],
      },
    ],
    couponId: 12,
  };

  const buttonRef = useRef();

  useEffect(() => {
    const loadTossPayments = async () => {
      try {
        // 토스페이먼츠 라이브러리 비동기로 로드
        const TossPayments = await import(
          "https://js.tosspayments.com/v1/payment"
        );

        // 클라이언트 키로 객체 초기화
        const clientKey = "test_ck_pP2YxJ4K87By0b4RZeo0rRGZwXLO";
        const tossPayments = TossPayments.default(clientKey);

        // 버튼에 클릭 이벤트 추가
        buttonRef.current.addEventListener("click", () => {
          // 결제창 띄우기
          tossPayments.requestPayment("card", {
            amount: 20,
            orderId: "2ab88b105d-8bd1-436a-ab52-731396a352bda",
            orderName: "포인트 충전",
            customerName: "첫번째",
            customerEmail: "test1@gmail.com",
            successUrl: "http://localhost:8080/api/v1/payments/toss/success",
            failUrl: "http://localhost:8080/api/v1/payments/toss/fail",
          });
        });
      } catch (error) {
        console.error("Failed to load TossPayments:", error);
      }
    };

    loadTossPayments();
  }, []);

  return (
    <div className="payment-page">
      <Header
        headerProps={{
          pageName: "주문결제",
          isClose: false,
          linkTo: `/store?storeId=${storeId}&inout=${inout}`,
        }}
      />

      <div className="payment-page__cafe-info">
        <img
          className="payment-page__cafe-info__img"
          src={paymentData.imgUrl}
        ></img>
        <text className="payment-page__cafe-info__name">
          {paymentData.name}
        </text>
      </div>

      <div className="payment-page__order-info">
        {paymentData.carts.map((item) => (
          <div>
            <div className="payment-page__order-info__item">
              <img
                className="payment-page__order-info__item__img"
                src={item.imgUrl || noImageMenu}
              ></img>

              <div>
                <div className="payment-page__order-info__item__name">
                  {item.name}
                </div>
                <div className="payment-page__order-info__item__option">
                  {item.options.map((option) => (
                    <div>•{option.name}</div>
                  ))}
                </div>
                <div className="payment-page__order-info__item__price">
                  {item.price}
                </div>
              </div>
            </div>
            <div className="payment-page__order-info__item__line"></div>
          </div>
        ))}
      </div>

      {/* 버튼에 ref 추가 */}
      <div className="payment-page__btn" ref={buttonRef}>
        결제하기
      </div>
    </div>
  );
};
// const PaymentPage = () => {
//   const [paymentMethod, setPaymentMethod] = useState("PayPal");

//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   if (!shippingAddress.address) {
//     history.push("/shipping");
//   }

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(savePaymentMethod(paymentMethod));
//     history.push("/placeorder");
//   };

//   return (
//     <div className="payment-page">
//       {/* <div className="payment-page__title">어떻게 결제할까요?</div>
//             <div className="payment-page__content__title">
//                 결제방식을 선택해주세요
//             </div>
//             <div className="payment-page__btn">
//                 <img
//                     className="payment-page__btn__img"
//                     src={takeIn}
//                     alt="takeOut"
//                 />
//                 <span className="payment-page__text">먹고갈게요</span>
//             </div>
//             <div className="payment-page__btn">
//                 <img
//                     className="payment-page__btn__img"
//                     src={takeOut}
//                     alt="takeOut"
//                 />
//                 <span className="payment-page__text">가져갈게요</span>
//             </div> */}
//     </div>
//   );
// };
export default PaymentPage;
