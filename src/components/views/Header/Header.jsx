import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../../../Atom/status";
import { IMAGES } from "../../../constants/images";
import TEXT from "../../../constants/text";
import Modal from "../Modal/Modal";
import "./Header.css";

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

  // const handleGoBack = () => {
  //   window.history.back();
  // };

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
    navigate("/login");
  };

  return (
    <>
      {/* headerProps가 주어진 경우 */}
      {headerProps ? (
        <header className="top_header_page">
          <img
            src={IMAGES.headerBack}
            alt="back"
            className="header_back"
            // onClick={() => handleGoBack()}
            onClick={() => navigate(headerProps.linkTo, { replace: true })}
          />
          <span>{headerProps.pageName}</span>
          <div className="homeAndCart">
            {/* 현재 페이지가 홈이 아니고 장바구니 페이지가 아닌 경우에만 장바구니 아이콘 표시 */}
            {!isCartPage ? (
              <div>
                <img
                  src={IMAGES.headerCart}
                  alt="cart"
                  className="header_cart"
                  onClick={() => navigate(`/cart`, { replace: true })}
                />

                <img
                  src={IMAGES.headerHome}
                  alt="home"
                  className="header_home1"
                  onClick={() => navigate(`/`, { replace: true })}
                />
              </div>
            ) : (
              <img
                src={IMAGES.headerHome}
                alt="home"
                className="header_home2"
                onClick={() => navigate(`/`, { replace: true })}
              />
            )}
          </div>
        </header>
      ) : (
        // headerProps가 주어지지 않은 경우
        <header className="top_header">
          {/* 홈 로고 (흰) */}
          <div className="top_header_img_wrapper">
            <img
              src={IMAGES.logoWhite}
              alt="Logo"
              className="header_logo"
              onClick={() => navigate(`/`, { replace: true })}
            />
            {/* 장바구니 (흰) */}
            <img
              src={IMAGES.homeCart}
              alt="cart"
              className="header_cart_home"
              onClick={handleCartClick}
            />
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
