import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../../constants/images";
import "./Header.css";

const Header = () => {
  return (
    <header className="top_header">
      <Link to="/home" className="header-link">
        <img src={IMAGES.home_logo} alt="Logo" className="header-logo" />
      </Link>
    </header>
  );
};

export default Header;
