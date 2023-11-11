import React from "react";
import { Link } from "react-router-dom";
import arrow from "../../../assets/images/icon_arrow.svg";
import close from "../../../assets/images/icon_close.svg";
import "./Header.css";

const Header = ({pageName, isClose}) => {

  return (
    <header className="top_header2">
      <div className="header-main__warpper">
        {!isClose ? (<div><Link to="/" style={{ textDecoration: "none"}}><img src={arrow} alt="arrow"/></Link></div>) : (<div></div>)}
        <span>{pageName}</span>
        {isClose ? (<div><img src={close} alt="close"/></div>) : (<div></div>)}
      </div>
    </header>
  );
};

export default Header;
