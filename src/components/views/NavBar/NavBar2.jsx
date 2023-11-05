import React from "react";
import heart_icon from "../../../assets/images/icon_heart.svg";
import home_icon from "../../../assets/images/icon_home.svg";
import list_icon from "../../../assets/images/icon_list.svg";
import mypage_icon from "../../../assets/images/icon_mypage.svg";
import search_icon from "../../../assets/images/icon_search.svg";
import "./NavBar.css";

const NavBar2 = () => {
  return (
    <nav className="bottom_navbar_2">
      <nav className="link-instead">
        <img
          src={search_icon}
          alt="SearchIcon"
          className="nav-item"
          style={{ opacity: 0 }}
        />
        <div className="nav-item-text"></div>
      </nav>

      <nav className="link-instead">
        <img
          src={list_icon}
          alt="ListIcon"
          className="nav-item"
          style={{ opacity: 0 }}
        />
        <div className="nav-item-text"></div>
      </nav>

      <nav className="link-instead">
        <img src={home_icon} alt="HomeIcon" style={{ opacity: 1 }} />
        <div className="nav-item-home"></div>
      </nav>

      <nav className="link-instead">
        <img
          src={heart_icon}
          alt="HeartIcon"
          className="nav-item"
          style={{ opacity: 0 }}
        />
        <div className="nav-item-text"></div>
      </nav>

      <nav className="link-instead">
        <img
          src={mypage_icon}
          alt="MypageIcon"
          className="nav-item"
          style={{ opacity: 0 }}
        />
        <div className="nav-item-text"></div>
      </nav>
    </nav>
  );
};

export default NavBar2;
