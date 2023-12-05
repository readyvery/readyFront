// import React, { useEffect, useState } from "react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAuthenticatedState } from "../../Atom/status";
import profile_icon from "../../assets/images/profile_icon.png";
import Header from "../../components/views/Header/Header";
import "./MyPage.css";

function Mypage() {
  // const [isAuth, setIsAuth] = useRecoilState(isAuthenticatedState);
  const [isAuth] = useRecoilState(isAuthenticatedState);
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const config = {
      withCredentials: true,
    };

    axios
      .get(`${apiUrl}/api/v1/user/info`, config)
      .then((response) => {
        const { name } = response.data;
        setUserName(name);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        // Handle error, e.g., redirect to login page
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mypage-div">
      <Header
        headerProps={{
          pageName: "마이페이지",
          isClose: false,
          linkTo: "/",
        }}
      />

      <div className="mypage-profile-head">
        <div className="mypage-profile-list">
          {isAuth ? (
            // 로그인 한 경우 그림 이미지랑 이름 나오게
            <Link to="/myprofile" className="myprofile-link">
              <div className="login-box2" style={{ textDecoration: "none" }}>
                <img
                  src={profile_icon}
                  alt="ProfileIcon"
                  className="profile-icon2"
                  style={{ width: 60, height: 60 }}
                />
                <div className="profile-name">{userName}</div>
                <div className="profile-detailBtn">프로필보기</div>
              </div>
            </Link>
          ) : (
            // 로그인 안 한 경우 로그인 버튼 나오게
            <Link to="/kakaologin" className="not-login-box2">
              <img
                src={profile_icon}
                alt="ProfileIcon2"
                className="profile-icon2"
                style={{ width: 60, height: 60 }}
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
          to={isAuth ? "/status" : "/kakaologin"}
          className="mypage-order-list-link"
        >
          <div className="mypage-order-list">주문내역</div>
        </Link>
        <Link className="mypage-order-type-link">
          <div className="mypage-order-type">결제 수단 등록 (준비중)</div>
        </Link>
        <Link
          to={isAuth ? "/coupon" : "/kakaologin"}
          className="mypage-order-coupon-link"
        >
          <div className="mypage-order-coupon">할인쿠폰</div>
        </Link>
      </div>

      {/* mypage etc*/}
      <div className="mypage-etc">
        <div className="mypage-etc-text">문의 및 알림</div>
        <Link to="/eventing" className="mypage-etc-event-link">
          <div className="mypage-etc-event">진행 중인 이벤트</div>
        </Link>
        <Link to="/policy" className="mypage-etc-policy-link">
          <div className="mypage-etc-policy">약관 및 정책</div>
        </Link>
        <Link to="/customerservice" className="mypage-etc-sos-link">
          <div className="mypage-etc-sos">고객센터</div>
        </Link>
      </div>
    </div>
  );
}

export default Mypage;
