import React from "react";
import arrow from "../../../assets/images/icon_arrow.svg";
import close from "../../../assets/images/icon_close.svg";
import "./Header.css";

const Header = ({pageName, isClose}) => {
  return (
    <header className="top_header2">
      <div className="header-main__warpper">
        {!isClose ? (<div><img src={arrow} alt="arrow"/></div>) : (<div></div>)}
        <span>{pageName}</span>
        {isClose ? (<div><img src={close} alt="close"/></div>) : (<div></div>)}
      </div>
    </header>
  );
};

export default Header;
