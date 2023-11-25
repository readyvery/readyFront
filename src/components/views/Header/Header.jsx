import React from "react";
import { Link } from "react-router-dom";
import home_logo from "../../../assets/images/home_logo.svg";
import arrow from "../../../assets/images/icon_arrow.svg";
import close from "../../../assets/images/icon_close.svg";
import "./Header.css";

const Header = ({ headerProps }) => {
  return (
    <>
      {headerProps ? (
        <header className="top_header_page">
          <div className="header-main__warpper">
            {!headerProps.isClose ? (
              <div>
                <Link
                  to={headerProps.linkTo}
                  style={{ textDecoration: "none" }}
                >
                  <img src={arrow} alt="arrow" />
                </Link>
              </div>
            ) : (
              <div></div>
            )}
            <span>{headerProps.pageName}</span>
            {headerProps.isClose ? (
              <div>
                <Link to={headerProps.linkTo}>
                  <img src={close} alt="close" />
                </Link>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </header>
      ) : (
        <header className="top_header">
          <Link to="/" className="header-link">
            <img src={home_logo} alt="Logo" className="header-logo" />
          </Link>
        </header>
      )}
    </>
  );
};

export default Header;
