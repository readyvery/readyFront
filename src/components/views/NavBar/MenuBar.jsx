// MenuBar.js

import React from "react";
import "./MenuBar.css"; // CSS 파일을 임포트합니다.

const MenuBar = () => {
  return (
    <div className="menu-bar">
      <a href="#" className="menu-item">
        🔍
      </a>
      <a href="#" className="menu-item">
        📄
      </a>
      <a href="#" className="menu-item menu-item-middle">
        🏠
      </a>{" "}
      {/* 이 아이템이 볼록한 모양을 가집니다. */}
      <a href="#" className="menu-item">
        ❤️
      </a>
      <a href="#" className="menu-item">
        👤
      </a>
    </div>
  );
};

export default MenuBar;
