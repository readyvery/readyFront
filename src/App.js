import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../src/pages/HomePage/Homepage";
import StoreDetailPage from "../src/pages/StoreDetailPage/StoreDetailPage";
import TestPage from "../src/pages/TestPage/TestPage";
import "./App.css";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import OrderStorage from "./pages/OrderStorage/OrderStorage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={<HomePage />} />
        {/* 없는 경로로 갈 경우 메인페이지로 강제 이동 */}
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        {/* 테스트 페이지 - 카페검색*/}
        <Route path="/search" element={<TestPage />} />
        {/* 테스트 페이지 - 주문내역*/}
        <Route path="/storage" element={<OrderStorage />} />
        {/* 테스트 페이지 - 주문상태*/}
        <Route path="/status" element={<OrderStatus />} />
        {/* 테스트 페이지 - 주문상세*/}
        <Route path="/detail" element={<OrderDetail />} />
        {/* 테스트 페이지 - 바로주문*/}
        <Route path="/ready" element={<TestPage />} />
        {/* 테스트 페이지 - 마이페이지*/}
        <Route path="/mypage" element={<TestPage />} />
        {/* 테스트 페이지 - 로그인*/}
        <Route path="/login" element={<TestPage />} />
        {/* 테스트 페이지 - 이벤트*/}
        <Route path="/event" element={<TestPage />} />
        {/* 테스트 페이지 - 각 카페 디테일*/}
        <Route path="/storeDetail" element={<StoreDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
