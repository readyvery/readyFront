import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { IMAGES } from "../../../constants/images";

import "./NavBar.css";
const NavBar = () => {
  const [activeNav, setActiveNav] = useState(1);

  return (
    <nav className="bottom_navbar">
      <Link
        to="/search"
        className="nav-link"
        onClick={() => {
          setActiveNav(1);
        }}
      >
        <NavColor>
          <img
            src={IMAGES.search_icon}
            alt="SearchIcon"
            className={activeNav === 1 ? "nav-item active" : "nav-item"}
          />
        </NavColor>
      </Link>

      <Link
        to="/status"
        className="nav-link"
        onClick={() => {
          setActiveNav(2);
        }}
      >
        <NavColor>
          <img
            src={IMAGES.list_icon}
            alt="ListIcon"
            className={activeNav === 2 ? "nav-item active" : "nav-item"}
          />
        </NavColor>
      </Link>

      <Link
        to="/home"
        className="nav-link"
        onClick={() => {
          setActiveNav(3);
        }}
      >
        <NavColor>
          <img
            src={IMAGES.home_icon}
            alt="HomeIcon"
            className={activeNav === 3 ? "nav-item active" : "nav-item"}
          />
        </NavColor>
      </Link>

      <Link
        to="/ready"
        className="nav-link"
        onClick={() => {
          setActiveNav(4);
        }}
      >
        <NavColor>
          <img
            src={IMAGES.heart_icon}
            alt="HeartIcon"
            className={activeNav === 4 ? "nav-item active" : "nav-item"}
          />
        </NavColor>
      </Link>

      <Link
        to="/mypage"
        className="nav-link"
        onClick={() => {
          setActiveNav(5);
        }}
      >
        <NavColor>
          <img src={IMAGES.mypage_icon} alt="MypageIcon" className="nav-item" />
        </NavColor>
      </Link>
    </nav>
  );
};

export default NavBar;

const animation = keyframes`
50% {
  transform: scale(0.82);
}
`;

const NavColor = styled.div`
  &:active {
    animation: ${animation} 0.5s;
  }
`;
