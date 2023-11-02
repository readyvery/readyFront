import React from "react";
import { Link } from "react-router-dom";
import home_logo from "../../../assets/images/home_logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <header className="top_header">
      <Link to="/home" className="header-link">
        <img src={home_logo} alt="Logo" className="header-logo" />
      </Link>
    </header>
  );
};

export default Header;
