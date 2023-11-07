import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profile_icon from "../../assets/images/profile_icon.svg";
import Header from "../../components/views/Header/Header";
import "./MyPage.css";

function Mypage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <div className="mypage-div">
      <Header />

      <div className="mypage-profile-head">
        <div className="mypage-profile-list">
          {isLoggedIn ? (
            // 로그인 한 경우 그림 이미지랑 이름 나오게
            <div className="login-box2">
              <img
                src={profile_icon}
                alt="ProfileIcon"
                className="profile-icon2"
              />
              <div className="profile-name">강짱구</div>
              <div className="profile-detailBtn">프로필보기</div>
            </div>
          ) : (
            // 로그인 안 한 경우 로그인 버튼 나오게
            <Link to="/login" className="not-login-box2">
              <img
                src={profile_icon}
                alt="ProfileIcon2"
                className="profile-icon2"
              />
              <div className="not-loggedIn2">로그인하고 시작하기</div>
            </Link>
          )}
        </div>
      </div>

      {/* mypage order*/}
      <div className="mypage-order">
        <div className="mypage-order-text">주문 및 결제</div>
        <Link
          to={isLoggedIn ? "/status" : "/login"}
          className="mypage-order-list-link"
        >
          <div className="mypage-order-list">주문내역</div>
        </Link>
        <Link
          to={isLoggedIn ? "/" : "/login"}
          className="mypage-order-type-link"
        >
          <div className="mypage-order-type">결제 수단 등록</div>
        </Link>
        <Link
          to={isLoggedIn ? "/coupon" : "/login"}
          className="mypage-order-coupon-link"
        >
          <div className="mypage-order-coupon">할인쿠폰</div>
        </Link>
      </div>

      {/* mypage etc*/}
      <div className="mypage-etc">
        <div className="mypage-etc-text">문의 및 알림</div>
        <Link
          to={isLoggedIn ? "/status" : "/login"}
          className="mypage-etc-event-link"
        >
          <div className="mypage-etc-event">진행 중인 이벤트</div>
        </Link>
        <Link
          to={isLoggedIn ? "/" : "/login"}
          className="mypage-etc-policy-link"
        >
          <div className="mypage-etc-policy">약관 및 정책</div>
        </Link>
        <Link
          to={isLoggedIn ? "/coupon" : "/login"}
          className="mypage-etc-sos-link"
        >
          <div className="mypage-etc-sos">고객센터</div>
        </Link>
      </div>
    </div>
  );
}

export default Mypage;
