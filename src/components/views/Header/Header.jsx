import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cart_icon from "../../../assets/images/cart_icon.svg";
import home_logo from "../../../assets/images/home_logo.svg";
import home_logo_bk from "../../../assets/images/home_logo_bk.svg";
import back from "../../../assets/images/icon_back.svg";
import icon_bag from "../../../assets/images/icon_bag.svg";
import close from "../../../assets/images/icon_close.svg";
import "./Header.css";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../../../Atom/status";
import Modal from "../Modal/Modal";
import TEXT from "../../../constants/text";

const Header = ({ headerProps }) => {
  const isAuth = useRecoilValue(isAuthenticatedState);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  const toggleModal = () => {
    if (!isAuth) {
      setIsOpen(!isOpen);
    } else {
      navigate(`/cart`);
    }
  };

  useEffect(() => {
    // 모달 상태가 변경될 때만 실행
    if (isOpen && !isAuth) {
      setIsOpen(true);
    }
  }, [isOpen, isAuth]);

  const handleCartClick = () => {
    toggleModal();
  };

  const handleCancel = () => {
    setIsOpen(false);
    navigate("/kakaoLogin");
  };

  return (
    <>
      {/* headerProps가 주어진 경우 */}
      {headerProps ? (
        <header className="top_header_page">
          <div className="header-main__warpper">
            {/* isClosed가 false인 경우 */}
            {!headerProps.isClose ? (
              <div
                onClick={() => navigate(headerProps.linkTo, { replace: true })}
                className="back-link"
              >
                <img src={back} alt="back" />
              </div>
            ) : (
              // isClosed가 true인 경우면 빈 div
              <div></div>
            )}
            {/* 페이지 이름 표시 */}
            <span>{headerProps.pageName}</span>
            {/* isClosed가 true인 경우 */}
            {headerProps.isClose ? (
              <div
                onClick={() => navigate(headerProps.linkTo, { replace: true })}
                className="close-link"
              >
                <img src={close} alt="close" />
              </div>
            ) : (
              <div className="homeAndCart">
                {/* 현재 페이지가 홈이 아니고 장바구니 페이지가 아닌 경우에만 장바구니 아이콘 표시 */}
                {!isCartPage ? (
                  <div>
                    <Link to="/cart" className="cart-link">
                      <img src={icon_bag} alt="bagIcon" className="bag-icon" />
                    </Link>

                    <Link to="/" className="home-link">
                      <img
                        src={home_logo_bk}
                        alt="homeIcon"
                        className="homeIcon"
                      />
                    </Link>
                  </div>
                ) : (
                  <Link to="/" className="home-link-2">
                    <img
                      src={home_logo_bk}
                      alt="homeIcon"
                      className="homeIcon2"
                    />
                  </Link>
                )}
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
          {/* <Link to="/cart" className="header-cart">
            <img src={cart_icon} alt="CartIcon" className="cart-icon" />
          </Link> */}
          <div onClick={handleCartClick} className="header-cart">
            <img src={cart_icon} alt="CartIcon" className="cart-icon" />
          </div>
        </header>
      )}

      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          handleCancel={handleCancel}
          title={TEXT.cartModal.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
          subtitle={"로그인 후 장바구니를 담아주세요."}
        />
      )}
    </>
  );
};

export default Header;
