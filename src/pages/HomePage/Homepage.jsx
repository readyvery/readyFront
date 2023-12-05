import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
// import event_icon from "../../assets/images/event_icon.svg";
// import home_cafedream from "../../assets/images/home_cafedream.svg";
// import home_harang from "../../assets/images/home_harang.svg";
// import home_orda from "../../assets/images/home_orda.svg";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../../Atom/status";
import eventTextIcon from "../../assets/images/icon_eventText.svg";
import profile_icon from "../../assets/images/profile_icon.svg";
import store_not_open from "../../assets/images/store_not_open.svg";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import NavBar2 from "../../components/views/NavBar/NavBar2";
import "./Homepage.css";

function Homepage() {
  // const isLoggedIn = window.localStorage.getItem("isAuthenticated");
  const apiRoot = process.env.REACT_APP_API_ROOT;
  // const [cookies] = useCookies(["accessToken"]);
  // const [loggedIn, setLoggedIn] = useState(false);
  const isAuth = useRecoilValue(isAuthenticatedState);

  // useEffect(() => {
  //   if (cookies?.accessToken) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cookies]);

  const [quickOrder, setQuickOrder] = useState([]);
  // {/* 바로주문 */}
  useEffect(() => {
    if (isAuth) {
      const config = {
        withCredentials: true,
      };
      // Fetch data from the backend API
      axios
        .get(`${apiRoot}/api/v1/order/history/old`, config)
        .then((response) => {
          setQuickOrder(response.data.receipts);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const [stores, setStores] = useState([]);
  /* verypick 가게 정보 */
  useEffect(() => {
    const config = {
      withCredentials: true,
    };
    // Fetch data from the backend API
    axios
      .get(`${apiRoot}/api/v1/board/store`, config)
      .then((response) => {
        setStores(response.data.stores);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 홈 이벤트 배너
  const [eventBanner, setEventBanner] = useState([]);

  useEffect(() => {
    const config = {
      withCredentials: true,
    };
    axios
      .get(`${apiRoot}/api/v1/event/banner`, config)
      .then((response) => {
        setEventBanner(response.data.banners);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [couponIssued, setCouponIssued] = useState(false);

  const handleCouponClick = (couponCode, couponId) => {
    const config = {
      withCredentials: true,
    };

    if (couponIssued) {
      return;
    }

    axios
      .post(
        `${apiRoot}/api/v1/coupon`,
        {
          couponCode,
          couponId,
        },
        config
      )
      .then((response) => {
        console.log(response);
        message.success("쿠폰 받기 완료!");
        setCouponIssued(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.warning("쿠폰을 이미 받았어요!");
      });
  };

  return (
    // <div className="load">
    <div className="homepage">
      <Header headerProps={null} />

      <div className="quick-order">
        <div className="quick-order-text">바로 주문</div>
        <div className="quick-order-list">
          {isAuth ? (
            quickOrder.length > 0 ? (
              quickOrder.map((item) => (
                <Link
                  to={`/payment?storeId=${item.storeId}&inout=${item.inOut}&cartId=${item.cartId}`}
                  className="login-box"
                  key={item.id}
                >
                  <div className="quick-order-item">
                    <div className="item-name">{item.name}</div>
                    <div className="item-detail">{item.orderName}</div>
                    <div className="item-price">{item.amount}원</div>
                  </div>
                </Link>
              ))
            ) : (
              <Link to={`/search`} className="not-login-box">
                <img
                  src={profile_icon}
                  alt="ProfileIcon"
                  className="profile-icon"
                />
                <div className="not-loggedIn">첫 주문 후 이용가능합니다</div>
              </Link>
            )
          ) : (
            <Link to="/kakaologin" className="not-login-box">
              <img
                src={profile_icon}
                alt="ProfileIcon"
                className="profile-icon"
              />
              <div className="not-loggedIn">로그인하고 시작하기</div>
            </Link>
          )}
        </div>
      </div>

      {/* 이벤트 div */}
      <div className="event">
        {isAuth
          ? eventBanner.map((item) => (
              <img
                key={item.idx}
                src={item.bannerImg}
                alt="eventBanner"
                className="event-icon"
                onClick={() => handleCouponClick(item.couponCode, item.idx)}
              />
            ))
          : eventBanner.map((item) => (
              <img
                key={item.idx}
                src={item.bannerImg}
                alt="eventBanner"
                className="event-icon"
              />
            ))}

        {/* {eventCase[0].events.map((event) => (
          <img src={event.imgUrl} alt="event" className="event-icon" />
        ))} */}

        {/* <EventSlider {...settings}>
          {eventCase[0].events.map((event) => (
            <EventImg src={event.imgUrl} alt="event" />
          ))}
        </EventSlider> */}
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
              fontFamily: "Regular",
            }}
          >
            레디베리는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
          </div>
          <div
            style={{
              fontSize: "11px",
              fontFamily: "Regular",
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
