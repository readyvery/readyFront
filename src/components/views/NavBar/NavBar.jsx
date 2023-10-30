import React from "react";

function NavBar() {
  return (
    <div className="bottom_navbar">
      <a href="/search">카페검색</a>
      <a href="/status">주문현황</a>
      <a href="/home">Home</a>
      <a href="/ready">바로주문</a>
      <a href="/mypage">마이페이지</a>
    </div>
  );
}

export default NavBar;
