import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../../Atom/status";
import eventTextIcon from "../../assets/images/icon_eventText.svg";
import Modal from "../../components/views/Modal/Modal";
import store_not_open from "../../assets/images/store_not_open.svg";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import NavBar2 from "../../components/views/NavBar/NavBar2";
import QuickOrderComponent from "../../components/views/Quickorder/QuickOrder";
import "./Homepage.css";
import usePostCoupon from "../../hooks/usePostCoupon";
import useFetchStores from "../../hooks/useFetchStores";
import useFetchEventBanners from "../../hooks/useFetchEventBanners";

function Homepage() {
  const navigate = useNavigate();
  const postCoupon = usePostCoupon();
  const stores = useFetchStores();
  const eventBanners = useFetchEventBanners();
  // const isLoggedIn = window.localStorage.getItem("isAuthenticated");
  // const [cookies] = useCookies(["accessToken"]);
  // const [loggedIn, setLoggedIn] = useState(false);
  const isAuth = useRecoilValue(isAuthenticatedState);
  //const [quickOrder, setQuickOrder] = useState([]);
  const [couponIssued, setCouponIssued] = useState(false);
  const [notLoggedInbannerClick, setnotLoggedInbannerClick] = useState(false);

  const loginText = "로그인 하신 후<br />이용해 주시기 바랍니다.";

  const handleCancel = () => {
    console.log("Cancel button clicked");
    setnotLoggedInbannerClick(false);
    // Navigate to /kakaologin page
    navigate("/kakaologin");
  };

  const handleCouponClick = (couponCode, couponId) => {
    postCoupon(couponCode, couponId, couponIssued, setCouponIssued);
  };

  return (
    // <div className="load">
    <div className="homepage">
      <Header headerProps={null} />

      <div className="quick-order">
        <div className="quick-order-text">바로 주문</div>
        <QuickOrderComponent isAuth={isAuth} />
      </div>

      {/* 이벤트 div */}
      <div className="event">
        {isAuth
          ? eventBanners.map((item) => (
              <img
                key={item.idx}
                src={item.bannerImg}
                alt="eventBanner"
                className="event-icon"
                onClick={() => handleCouponClick(item.couponCode, item.idx)}
              />
            ))
          : eventBanners.map((item) => (
              <img
                key={item.idx}
                src={item.bannerImg}
                alt="eventBanner"
                className="event-icon"
                onClick={() => setnotLoggedInbannerClick(true)}
              />
            ))}
        {notLoggedInbannerClick && (
          <Modal
            setIsOpen={setnotLoggedInbannerClick} // 취소(모달창 닫기)
            handleCancle={handleCancel} // 확인(카카오 로그인하기로 이동)
            title={<div dangerouslySetInnerHTML={{ __html: loginText }} />}
            subtitle="로그인 후 쿠폰받기를 계속 진행해주세요."
          />
        )}
      </div>

      {/* 베리pick div */}
      <div className="very-pick">
        <div className="very-pick-text">베리 PICK</div>
        <div className="very-pick-list">
          <div className="very-pick-items">
            {stores.map((item) => (
              <Link
                to={`/packagingStatus?storeId=${item.idx}`}
                className="very-pick-item"
              >
                <React.Fragment key={item.idx}>
                  <div className="pick-detail-wrapper">
                    <img
                      src={item.imgUrl}
                      alt="veryPickimg"
                      className="pick-detail"
                    />
                    {!item.status && (
                      <div className="closed-image-div">
                        <img
                          src={store_not_open} // Replace with your closed image path
                          alt="closedImage"
                          className="closed-image"
                        />
                      </div>
                    )}
                    <div className="pick-info">
                      <div className="pick-name">{item.name}</div>
                      <div className="pick-address">{item.address}</div>
                      <div className="pick-event-info">
                        <img
                          src={eventTextIcon}
                          alt="eventTextIcon"
                          className="pick-eventTextIcon"
                        />
                        <div className="pick-eventText">
                          {item.eventMessage}
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 사업자 정보 */}
      <div className="business-info">
        <div className="business-name">ReadyVery</div>
        <div className="business-list">
          <div>상호명: 레디베리</div>
          <div>사업자등록번호: 738-32-01406</div>
          <div>대표: 오남택 &nbsp;|&nbsp; 고객센터: 010-9295-5340</div>
          <div>
            주소: 서울특별시 서대문구 세검정로1길 95, 115동 203호(홍은동,
            벽산아파트)
          </div>
          <div>E-Mail: ohnt0307@gmail.com</div>

          <div
            style={{
              marginTop: "10px",
              fontSize: "11px",
              fontFamily: "Pretendard Variable",
              fontStyle: "Regular",
            }}
          >
            레디베리는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
          </div>

          <div
            style={{
              fontSize: "11px",
              fontFamily: "Pretendard Variable",
              fontStyle: "Regular",
            }}
          >
            따라서 레디베리는 상품거래 정보 및 거래에 대한 책임을 지지않습니다.
          </div>
        </div>
      </div>

      <NavBar2 />
      <NavBar />
    </div>
    // </div>
  );
}

export default Homepage;
