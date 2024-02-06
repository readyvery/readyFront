import "./Homepage.css";
import { IMAGES } from "../../constants/images";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../../Atom/status";
import { useNavigate } from "react-router-dom";
import QuickOrderComponent from "../../components/views/Quickorder/QuickOrder";
import useFetchEventBanners from "../../hooks/useFetchEventBanners";
import usePostCoupon from "../../hooks/usePostCoupon";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
// import EventBannerSlider from "../../components/views/EventBannerSlider/EventBannerSlider";
import useFetchStores from "../../hooks/useFetchStores";

const HomePage = () => {
  const isAuth = useRecoilValue(isAuthenticatedState);
  const navigate = useNavigate();
  const eventBanners = useFetchEventBanners();
  const postCoupon = usePostCoupon();
  const [couponIssued, setCouponIssued] = useState(false);
  const [current, setCurrent] = useState(0);
  const length = eventBanners.length;
  const stores = useFetchStores();

  const handleSwiper = useSwipeable({
    onSwipedLeft: () => setCurrent(current === length - 1 ? 0 : current + 1),
    onSwipedRight: () => setCurrent(current === 0 ? length - 1 : current - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (!Array.isArray(eventBanners) || eventBanners.length <= 0) {
    return null;
  }

  const handleCouponClick = (couponCode, couponId) => {
    postCoupon(couponCode, couponId, couponIssued, setCouponIssued);
  };

  return (
    <div className="home">
      <Header headerProps={null} />

      <div className="home_individual">
        {isAuth ? (
          <div className="home_individual_login">
            <div className="home_individual_benefits">
              <div className="home_individual_user">
                오늘도 준비된,&nbsp;
                <span className="home_individual_user_name">김베리</span>님
              </div>
              <div className="home_individual_point">
                231,552 P
                <span
                  className="home_individual_coupon_box"
                  onClick={() => navigate(`/coupon`)}
                >
                  쿠폰함
                </span>
              </div>
            </div>

            <div className="home_individual_quick_order">
              <QuickOrderComponent />
            </div>
          </div>
        ) : (
          <div className="home_individual_benefits">
            <div className="home_individual_welcome">Welcome :)</div>
            <div className="home_individual_not_login">
              로그인 후 이용가능합니다
              <img
                src={IMAGES.toLogin}
                alt="login"
                className="home_individual_login_btn"
                onClick={() => navigate(`/kakaoLogin`)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="home_event" {...handleSwiper}>
        {eventBanners.map((item, index) => (
          <div
            className={
              index === current ? "home_event_slide_active" : "home_event_slide"
            }
            key={index}
          >
            {index === current && (
              <img
                key={item.idx}
                src={item.bannerImg}
                alt="event"
                className="home_event_banner"
                onClick={() => handleCouponClick(item.couponCode, item.idx)}
              />
            )}
          </div>
        ))}
        <div className="home_event_slide_index">
          <span className="home_event_slide_index_now">{current + 1}</span>/
          {length}
        </div>

        {/* <EventBannerSlider banners={banners} /> */}
      </div>

      <div className="home_berry_pick">
        베리 PICK
        <div className="home_berry_pick_list">
          {stores.map((item) => (
            <div
              className="home_berry_pick_item"
              onClick={() => navigate(`/packagingStatus?storeId=${item.idx}`)}
            >
              <img
                src={item.imgUrl}
                alt="veryPickimg"
                className="home_berry_pick_cafe_img"
              />
              {!item.status && (
                <img
                  src={IMAGES.cafeClose}
                  alt="closedImage"
                  className="home_berry_pick_cafe_close"
                />
              )}
              <div className="home_berry_pick_cafe_name">{item.name}</div>
              <div className="home_berry_pick_cafe_address">{item.address}</div>
              <div className="home_berry_pick_cafe_event">
                <img
                  src={IMAGES.cafeEvent}
                  alt="eventTextIcon"
                  className="home_berry_pick_cafe_event_icon"
                />
                {item.eventMessage}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home_business_info">
        <div className="home_business_info_name">ReadyVery</div>

        <div className="home_business_info_content">
          상호명: 레디베리
          <br />
          사업자등록번호: 738-32-01406
          <br />
          대표: 오남택 &nbsp;|&nbsp; 고객센터: 010-9295-5340
          <br />
          주소: 서울특별시 서대문구 세검정로1길 95, 115동 203호(홍은동,
          벽산아파트)
          <br />
          E-Mail: ohnt0307@gmail.com
          <br />
          <br />
          레디베리는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
          <br />
          따라서 레디베리는 상품거래 정보 및 거래에 대한 책임을 지지않습니다.
        </div>

        <div></div>
      </div>

      <NavBar />
    </div>
  );
};

export default HomePage;
