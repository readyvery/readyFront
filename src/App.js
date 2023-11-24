import axios from "axios";
import React, { Suspense } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import HomePage from "../src/pages/HomePage/Homepage";
import MyPage from "../src/pages/MyPage/MyPage";
import StoreDetailPage from "../src/pages/StoreDetailPage/StoreDetailPage";
import "./App.css";
import Auth from "./hoc/auth";
import useInterval from "./hooks/useInterval";
import CafeSearchPage from "./pages/CafeSearch/CafeSearch";
import CartPage from "./pages/CartPage/CartPage";
import KakaoLoginPage from "./pages/LoginPage/Login";
import PolicyInLogin from "./pages/LoginPage/PolicyInLogin";
import CouponPage from "./pages/MyPage/CouponPage/CouponPage";
import EventingPage from "./pages/MyPage/EventingPage/EventingPage";
import MyprofilePage from "./pages/MyPage/MyprofilePage/MyprofilePage";
import PolicyPage from "./pages/MyPage/PolicyPage/PolicyPage";
import PositionpolicyPage from "./pages/MyPage/PolicyPage/PositionpolicyPage";
import PrivacyPolicy from "./pages/MyPage/PolicyPage/PrivacypolicyPage";
import TermsOfUse from "./pages/MyPage/PolicyPage/TermsofusePage";
import ThirdpartyPage from "./pages/MyPage/PolicyPage/ThirdpartyPage";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import OrderProcessPage from "./pages/OrderProcessPage/OrderProcessPage";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import OrderStorage from "./pages/OrderStorage/OrderStorage";
import PackagingStatusPage from "./pages/PackagingStatusPage/PackagingStatusPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import PaymentFailPage from "./pages/PaymentPage/Redirect/PaymentFailPage";
import PaymentSuccessPage from "./pages/PaymentPage/Redirect/PaymentSuccessPage";
import ReadyPage from "./pages/ReadyPage/ReadyPage";

function App() {
  const [cookies, , removeCookies] = useCookies();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_ROOT;
  // const navigate = useNavigate();
  // // const [isLoggedIn, setisLoggedIn] = useRecoilState(isAuthenticatedState); // 인증 상태 (로그인이 되어있으면 true, 아니면 false)
  // // 토큰 받아서 시간관리
  // const [cookies, setCookie, removeCookies] = useCookies([
  //   "refreshAccessToken",
  // ]);

  //false : 로그인 한 유저 못들어감
  const NewLoginPage = Auth(KakaoLoginPage, false); // 로그인 페이지

  //true : 로그인 한 유저 들어감
  const NewOrderStorage = Auth(OrderStorage, true);
  const NewOrderStatus = Auth(OrderStatus, true);
  const NewOrderDetail = Auth(OrderDetail, true);
  const NewReadyPage = Auth(ReadyPage, true);
  const NewMyprofilePage = Auth(MyprofilePage, true);

  const NewOrderProcessPage = Auth(OrderProcessPage, true);
  const NewCouponPage = Auth(CouponPage, true);
  const NewCartPage = Auth(CartPage, true);
  const NewPaymentPage = Auth(PaymentPage, true);
  const NewPaymentSuccessPage = Auth(PaymentSuccessPage, true);
  const NewPaymentFailPage = Auth(PaymentFailPage, true);
  // const NewPackagingStatusPage = Auth(PackagingStatusPage, true);

  const minute = 1000 * 60 * 60 * 24; // 24시간
  // 주기적으로 실행되는 함수
  useInterval(() => {
    // 리프레시 토큰이 존재하고, 비어 있지 않은 경우
    if (
      cookies.refreshToken !== "undefined" &&
      cookies.refreshToken !== undefined &&
      cookies.refreshToken
    ) {
      // http 요청에 사용될 헤더 설정과 함께 서버에 토큰 갱신 요청
      let config = {
        withCredentials: true,
      };
      axios
        .get(`${apiUrl}/api/v1/refresh/token`, config)
        .then((response) => {
          console.log(response);
          // 현재 쿠키 삭제
          if (!response.data) {
            removeCookies();
            navigate("/kakaologin");
          }
        })
        .catch((error) => {
          navigate("/kakaologin");
        });
    }
  }, minute - 60000); // 24시간 주기에서 1분을 뺀 주기로 주기적 실행

  return (
    <div className="App">
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* 로그인 하지 않아도 볼 수 있는 페이지 */}
            {/* 메인페이지 */}
            <Route path="/" element={<HomePage />} />
            {/* 없는 경로로 갈 경우 메인페이지로 강제 이동 */}
            {/* <Route path="/*" element={<Navigate to="/"></Navigate>}></Route> */}
            {/* 카페검색*/}
            <Route path="/search" element={<CafeSearchPage />} />
            {/* 로그인*/}
            <Route path="/kakaologin" element={<NewLoginPage />} />
            <Route path="/policyinlogin" element={<PolicyInLogin />} />
            {/* 마이페이지-약관정책 페이지 */}
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/termsofuse" element={<TermsOfUse />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/thirdparty" element={<ThirdpartyPage />} />
            <Route path="/position" element={<PositionpolicyPage />} />
            {/* 마이페이지-이벤트 페이지 */}
            <Route path="/eventing" element={<EventingPage />} />
            {/* 카페 상세 페이지*/}
            <Route path="/store" element={<StoreDetailPage />} />
            {/* 마이페이지*/}
            <Route path="/mypage" element={<MyPage />} />

            {/* 로그인 해야지 볼 수 있는 페이지 */}
            {/* 주문내역 페이지*/}
            <Route path="/storage" element={<NewOrderStorage />} />
            {/* 주문상태 페이지 - 추후 병합 예정*/}
            <Route path="/status" element={<NewOrderStatus />} />
            {/* 주문상세 페이지 - 추후 병합 예정*/}
            <Route path="/orderDetail" element={<NewOrderDetail />} />
            {/* 바로주문*/}
            <Route path="/ready" element={<NewReadyPage />} />
            {/* 마이페이지-마이프로필 확인 페이지 */}
            <Route path="/myprofile" element={<NewMyprofilePage />} />
            {/* 포장 여부 선택 페이지 */}
            <Route path="/packagingStatus" element={<PackagingStatusPage />} />
            {/* 주문 과정 페이지 */}
            <Route path="/order" element={<NewOrderProcessPage />} />
            {/* 마이페이지-쿠폰 확인 페이지 */}
            <Route path="/coupon" element={<NewCouponPage />} />
            {/* 장바구니 페이지 */}
            <Route path="/cart" element={<NewCartPage />} />
            {/* 결제 페이지 */}
            <Route path="/payment" element={<NewPaymentPage />} />
            {/* 결제 성공 리다이렉트 페이지 */}
            <Route
              path="/payment/success"
              element={<NewPaymentSuccessPage />}
            />
            {/* 결제 실패 리다이렉트 페이지 */}
            <Route path="/payment/fail" element={<NewPaymentFailPage />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

export default App;
