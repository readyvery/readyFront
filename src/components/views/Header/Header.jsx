import React from "react";
import { Link, useLocation } from "react-router-dom";
import cart_icon from "../../../assets/images/cart_icon.svg";
import home_logo from "../../../assets/images/home_logo.svg";
import home_logo_bk from "../../../assets/images/home_logo_bk.svg";
import arrow from "../../../assets/images/icon_arrow.svg";
import icon_bag from "../../../assets/images/icon_bag.svg";
import close from "../../../assets/images/icon_close.svg";
import "./Header.css";

const Header = ({ headerProps }) => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  return (
    <>
      {/* headerProps가 주어진 경우 */}
      {headerProps ? (
        <header className="top_header_page">
          <div className="header-main__warpper">
            {/* isClosed가 false인 경우 */}
            {!headerProps.isClose ? (
              <div>
                {/* 링크를 가지는 화살표 이미지 */}
                <Link
                  to={headerProps.linkTo}
                  style={{ textDecoration: "none" }}
                  className="arrow-link"
                >
                  <img src={arrow} alt="arrow" />
                </Link>
              </div>
            ) : (
              // isClosed가 true인 경우면 빈 div
              <div></div>
            )}
            {/* 페이지 이름 표시 */}
            <span>{headerProps.pageName}</span>
            {/* isClosed가 true인 경우 */}
            {headerProps.isClose ? (
              <div>
                {/* 링크를 가지는 닫기 아이콘 이미지 */}
                <Link to={headerProps.linkTo} className="close-link">
                  <img src={close} alt="close" />
                </Link>
              </div>
            ) : (
              //  isClosed가 false인 경우
              <div className="homeAndCart">
                {/* 현재 페이지가 홈이 아니고 장바구니 페이지가 아닌 경우에만 장바구니 아이콘 표시 */}
                {!isCartPage && (
                  <Link to="/cart" className="cart-link">
                    <img src={icon_bag} alt="bagIcon" className="bag-icon" />
                  </Link>
                )}
                {/* 항상 홈 아이콘 표시 */}
                <Link to="/" className="home-link">
                  <img src={home_logo_bk} alt="homeIcon" className="homeIcon" />
                </Link>
              </div>
            )}
          </div>
        </header>
      ) : (
        // headerProps가 주어지지 않은 경우
        <header className="top_header">
          {/* 홈 로고 (흰) */}
          <Link to="/" className="header-link">
            <img src={home_logo} alt="Logo" className="header-logo" />
          </Link>
          {/* 장바구니 (흰) */}
          <Link to="/cart" className="header-cart">
            <img src={cart_icon} alt="CartIcon" className="cart-icon" />
          </Link>
        </header>
      )}
    </>
  );
};

export default Header;
