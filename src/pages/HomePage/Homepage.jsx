import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cardi_cafe from "../../assets/images/cafe1.svg";
import milda_cafe from "../../assets/images/cafe2.svg";
import event_icon from "../../assets/images/event_icon.svg";
import profile_icon from "../../assets/images/profile_icon.svg";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import NavBar2 from "../../components/views/NavBar/NavBar2";
import "./Homepage.css";

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [quickOrderItems, setQuickOrderItems] = useState([
  //   { id: 1, name: "커피파로스" },
  //   { id: 2, name: "오르다" },
  //   // 추가 아이템들
  // ]);

  let eventCase = {
    event1: {
      idx: 1,
      imgUrl: event_icon,
      title: "inviteCoupon",
    },
    event2: {
      idx: 2,
      imgUrl: "이미지2의 URL",
    },
    // 다른 이벤트들...
  };

  // 연습
  const dummyQuickOrderItems = [
    {
      id: 1,
      name: "커피 파로스",
      address: "부천, 역곡동",
      detail: "(ICE) 더블크림 라떼",
    },
    {
      id: 2,
      name: "오르다",
      address: "부천, 역곡동",
      detail: "(ICE) 아이스아메리카노",
    },
    // 추가 아이템들
  ];

  const dummyVeryPickItems = [
    {
      id: 1,
      name: "까르디에스프레소바",
      address: "경기 부천시 부일로 705 1층 101호(역곡동, 역곡동 50-6)",
      img: cardi_cafe,
    },
    {
      id: 2,
      name: "밀다",
      address: "경기도 부천시 지봉로71",
      img: milda_cafe,
    },
    {
      id: 3,
      name: "까르디에스프레소바",
      address: "경기 부천시 부일로 705 1층 101호(역곡동, 역곡동 50-6)",
      img: cardi_cafe,
    },
  ];

  // useEffect(() => {
  //   // Axios를 사용하여 Quick Order 목록을 가져오는 부분
  //   if (isLoggedIn) {
  //     axios
  //       .get("") /* http://localhost:8080/ */
  //       .then((response) => {
  //         // 데이터 가져오기 성공 시, Quick Order 목록 업데이트
  //         setQuickOrderItems(response.data);
  //       })
  //       .catch((error) => {
  //         // 에러 처리
  //         console.error("Quick Order 목록을 가져오는 중 에러 발생:", error);
  //       });
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    // 서버에서 로그인 상태를 확인하는 비동기 함수
    // const checkLoginStatus = async () => {
    //   try {
    //     // axios를 사용하여 서버로 HTTP GET 요청 보내기
    //     const response = await axios.get(""); /* http://localhost:8080/ */

    //     // 서버 응답 데이터에서 로그인 상태를 가져와 업데이트
    //     setIsLoggedIn(response.data.isLoggedIn);
    //   } catch (error) {
    //     // 에러 처리
    //     console.error("로그인 상태 확인 중 에러 발생:", error);
    //   }
    // };

    // // 초기 로딩 시에 서버에서 로그인 상태 확인
    // checkLoginStatus();
    setIsLoggedIn(true); //false-로그아웃, ture-로그인
  }, []);

  return (
    <div className="homepage">
      <Header />

      <div className="quick-order">
        <div className="quick-order-text">바로 주문</div>
        <div className="quick-order-list">
          {isLoggedIn ? (
            // 로그인한 경우 Quick Order 목록을 렌더링
            // quickOrderItems.map((item) => (
            //   <React.Fragment key={item.id} className="quick-order-item">
            //     <div className="item-name">{item.name}</div>
            //     <div className="item-address">{item.address}</div>
            //     <div className="item-detail">{item.detail}</div>
            //   </React.Fragment>
            // ))
            dummyQuickOrderItems.map((item) => (
              <Link to="/ready" className="login-box">
                <React.Fragment key={item.id} className="quick-order-item">
                  <div className="item-name">{item.name}</div>
                  <div className="item-address">{item.address}</div>
                  <div className="item-detail">{item.detail}</div>
                </React.Fragment>
              </Link>
            ))
          ) : (
            // 로그인하지 않은 경우 다른 내용을 렌더링
            <Link to="/login" className="not-login-box">
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
        <Link to="/event" className="event-link">
          <img
            src={eventCase.event1.imgUrl}
            alt={eventCase.event1.title}
            className="event-icon"
          />
        </Link>
      </div>

      {/* 베리pick div */}
      <div className="very-pick">
        <div className="very-pick-text">베리 PICK</div>
        <div className="very-pick-list">
          <div className="very-pick-items">
            {dummyVeryPickItems.map((item) => (
              <Link
                to={`/packagingStatus?storeId=${item.id}`}
                className="very-pick-item"
              >
                <React.Fragment>
                  <div className="pick-name">{item.name}</div>
                  <div className="pick-address">{item.address}</div>
                  <img
                    src={item.img}
                    alt="veryPickimg"
                    className="pick-detail"
                  />
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
        </div>
      </div>

      <NavBar2 />
      <NavBar />
    </div>
  );
}

export default Homepage;
