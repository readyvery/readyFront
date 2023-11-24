import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import heart_icon from "../../../assets/images/icon_heart.svg";
import home_icon2 from "../../../assets/images/icon_home2.svg";
import list_icon from "../../../assets/images/icon_list.svg";
import mypage_icon from "../../../assets/images/icon_mypage.svg";
import search_icon from "../../../assets/images/icon_search.svg";
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
            src={search_icon}
            alt="SearchIcon"
            className={activeNav === 1 ? "nav-item active" : "nav-item"}
          />
          <div
            className={
              activeNav === 1 ? "nav-item-text active" : "nav-item-text"
            }
          >
            카페검색
          </div>
        </NavColor>
      </Link>

      <Link
        to="/storage"
        className="nav-link"
        onClick={() => {
          setActiveNav(2);
        }}
      >
        <NavColor>
          <img
            src={list_icon}
            alt="ListIcon"
            className={activeNav === 2 ? "nav-item active" : "nav-item"}
          />
          <div
            className={
              activeNav === 2 ? "nav-item-text active" : "nav-item-text"
            }
          >
            주문내역
          </div>
        </NavColor>
      </Link>

      <Link
        to="/"
        className="nav-link"
        onClick={() => {
          setActiveNav(3);
        }}
      >
        <NavColor>
          <img
            src={home_icon2}
            alt="HomeIcon"
            className={activeNav === 3 ? "nav-item active" : "nav-item"}
          />
          <div
            className={
              activeNav === 3 ? "nav-item-home2 active" : "nav-item-home2"
            }
          >
            Home
          </div>
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
            src={heart_icon}
            alt="HeartIcon"
            className={activeNav === 4 ? "nav-item active" : "nav-item"}
          />
          <div
            className={
              activeNav === 4 ? "nav-item-text active" : "nav-item-text"
            }
          >
            바로주문
          </div>
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
          <img
            src={mypage_icon}
            alt="MypageIcon"
            className={activeNav === 5 ? "nav-item active" : "nav-item"}
          />
          <div
            className={
              activeNav === 5 ? "nav-item-text active" : "nav-item-text"
            }
          >
            마이페이지
          </div>
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
