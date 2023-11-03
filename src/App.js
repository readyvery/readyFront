import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage/Homepage";
import TestPage from "../src/pages/TestPage/TestPage";
import "./App.css";
import StoreDetailPage from "./pages/StoreDetailPage/StoreDetailPage";

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
        <Route path="/status" element={<TestPage />} />
        {/* 테스트 페이지 - 바로주문*/}
        <Route path="/ready" element={<TestPage />} />
        {/* 테스트 페이지 - 마이페이지*/}
        <Route path="/mypage" element={<TestPage />} />

        {/* 카페 상세페이지 */}
        <Route path="/cafe/:cafeId" element={<StoreDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
