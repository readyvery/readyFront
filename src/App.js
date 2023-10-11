import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "../src/pages/LandingPage/LandingPage";
import TestPage from "../src/pages/TestPage/TestPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={<LandingPage />} />
        {/* 없는 경로로 갈경우 메인페이지로 강제 이동 */}
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        {/* 테스트 페이지 */}
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
