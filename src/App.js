import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage/Homepage";
import MyPage from "../src/pages/MyPage/MyPage";
import StoreDetailPage from "../src/pages/StoreDetailPage/StoreDetailPage";
import TestPage from "../src/pages/TestPage/TestPage";
import "./App.css";
import CafeSearchPage from "./pages/CafeSearch/CafeSearch";
import CartPage from "./pages/CartPage/CartPage";
import KakaoLoginPage from "./pages/LoginPage/Login";
import CouponPage from "./pages/MyPage/CouponPage";
import EventingPage from "./pages/MyPage/EventingPage";
import MyprofilePage from "./pages/MyPage/MyprofilePage";
import PolicyPage from "./pages/MyPage/PolicyPage";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import OrderProcessPage from "./pages/OrderProcessPage/OrderProcessPage";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import OrderStorage from "./pages/OrderStorage/OrderStorage";
import PackagingStatusPage from "./pages/PackagingStatusPage/PackagingStatusPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ReadyPage from "./pages/ReadyPage/ReadyPage";
import PaymentSuccessPage from "./pages/PaymentPage/Redirect/PaymentSuccessPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={<HomePage />} />
        {/* 없는 경로로 갈 경우 메인페이지로 강제 이동 */}
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        {/* 테스트 페이지 - 카페검색*/}
        <Route path="/search" element={<CafeSearchPage />} />
        {/* 주문내역 페이지*/}
        <Route path="/storage" element={<OrderStorage />} />
        {/* 주문상태 페이지 - 추후 병합 예정*/}
        <Route path="/status" element={<OrderStatus />} />
        {/* 주문상세 페이지 - 추후 병합 예정*/}
        <Route path="/orderDetail" element={<OrderDetail />} />
        {/* 테스트 페이지 - 바로주문*/}
        <Route path="/ready" element={<ReadyPage />} />
        {/* 테스트 페이지 - 마이페이지*/}
        <Route path="/mypage" element={<MyPage />} />
        {/* 테스트 페이지 - 로그인*/}
        <Route path="/kakaologin" element={<KakaoLoginPage />} />
        {/* 테스트 페이지 - 이벤트*/}
        <Route path="/event" element={<TestPage />} />
        {/* 카페 상세 페이지*/}
        <Route path="/store" element={<StoreDetailPage />} />
        {/* 포장 여부 선택 페이지 */}
        <Route path="/packagingStatus" element={<PackagingStatusPage />} />
        {/* 주문 과정 페이지 */}
        <Route path="/order" element={<OrderProcessPage />} />
        {/* 마이페이지-쿠폰 확인 페이지 */}
        <Route path="/coupon" element={<CouponPage />} />
        {/* 마이페이지-마이프로필 확인 페이지 */}
        <Route path="/myprofile" element={<MyprofilePage />} />
        {/* 마이페이지-이벤트 페이지 */}
        <Route path="/eventing" element={<EventingPage />} />
        {/* 마이페이지-약관정책 페이지 */}
        <Route path="/policy" element={<PolicyPage />} />
        {/* 장바구니 페이지 */}
        <Route path="/cart" element={<CartPage />} />
        {/* 결제 페이지 */}
        <Route path="/payment" element={<PaymentPage />} />
        {/* 결제 성공 페이지 */}
        <Route path="/paymentSuccess" element={<PaymentSuccessPage />} />
        {/* 결제 실패 페이지 */}
      </Routes>
    </div>
  );
}

export default App;
