import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import event_icon from "../../assets/images/event_icon.svg";
import home_cafedream from "../../assets/images/home_cafedream.svg";
import home_harang from "../../assets/images/home_harang.svg";
import home_orda from "../../assets/images/home_orda.svg";
import eventTextIcon from "../../assets/images/icon_eventText.svg";
import profile_icon from "../../assets/images/profile_icon.svg";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import NavBar2 from "../../components/views/NavBar/NavBar2";
import { loginState } from "../../recoil/user";
import "./Homepage.css";

//const EventSlider = styled(Slider)`
// width: 100%;
//`;

//const EventImg = styled.img`
//  height: 100%;
//`;

function Homepage() {
  const isLoggedIn = useRecoilValue(loginState);

  const eventCase = [
    {
      events: [
        {
          idx: 1,
          imgUrl: event_icon,
        },
      ],
    },
  ];

  // 연습
  const dummyQuickOrderItems = [
    {
      id: 1,
      name: "오르다",
      address: "부천, 역곡동",
      detail: "(ICE) 아이스아메리카노",
    },
    {
      id: 2,
      name: "카페하랑 부천점",
      address: "부천, 역곡동",
      detail: "(ICE) 아이스카페라떼",
    },
    {
      id: 3,
      name: "카페드림 가톨릭대점",
      address: "부천, 역곡동",
      detail: "(ICE) 아이스아메리카노",
    },
    {
      id: 4,
      name: "오르다",
      address: "부천, 역곡동",
      detail: "(ICE) 아이스아메리카노",
    },
    // 추가 아이템들
  ];

  const dummyVeryPickItems = [
    {
      id: 1,
      name: "카페오르다",
      address: "경기 부천시 지봉로 46 백호빌딩 2층",
      img: home_orda,
      eventText: "테이크아웃 시 아메리카노 1,700원",
    },
    {
      id: 3,
      name: "카페하랑 부천점",
      address: "경기도 부천시 지봉로 43",
      img: home_harang,
      eventText: "강의실에서 주문하고, 바로 가져가세요!",
    },
    {
      id: 2,
      name: "카페드림 가톨릭대학교 성심교정 중앙도서관점",
      address:
        "경기도 부천시 지봉로 43 가톨릭대학교 중앙도서관 1층 15베리타스관",
      img: home_cafedream,
      eventText: "기말고사 화이팅!",
    },
  ];

  // {/* 바로주문 */}
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

  // {/* 이벤트 배너 */}
  // useEffect(() => {
  //   // 서버에서 이벤트 배너 이미지 데이터 가져오기
  //   axios
  //     .get("/api/v1/event/banner")
  //     .then((response) => {
  //       setEventImages(response.data.imgs);
  //     })
  //     .catch((error) => {
  //       console.error("이벤트 배너 데이터를 가져오는 중 에러 발생:", error);
  //     });
  // }, []);

  // {/* verypick 가게 정보 */}
  // useEffect(() => {
  //   // 서버에서 가게 정보 데이터 가져오기
  //   axios
  //     .get("/api/v1/board")
  //     .then((response) => {
  //       setStoreData(response.data.stores);
  //     })
  //     .catch((error) => {
  //       console.error("가게 정보 데이터를 가져오는 중 에러 발생:", error);
  //     });
  // }, []);

  return (
    <div className="homepage">
      <Header headerProps={null} />

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
              //to={`/ready?quickId=${item.id}`}
              <Link to="/ready" className="login-box">
                <React.Fragment key={item.id}>
                  <div className="quick-order-item">
                    <div className="item-name">{item.name}</div>
                    <div className="item-address">{item.address}</div>
                    <div className="item-detail">{item.detail}</div>
                  </div>
                </React.Fragment>
              </Link>
            ))
          ) : (
            // 로그인하지 않은 경우 다른 내용을 렌더링
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
        {/* {eventImages.map((image, index) => (
          <Link to="/event" className="event-link" key={image.idx}>
            <img src={image.imgUrl} alt={`Event ${index}`} className="event-icon" />
          </Link>
        ))} */}
        {eventCase[0].events.map((event) => (
          <img src={event.imgUrl} alt="event" className="event-icon" />
        ))}
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
            {/* {storeData.map((store) => (
              <Link
                to={`/packagingStatus?storeId=${store.idx}`}
                className="very-pick-item"
                key={store.idx}
              >
                <div className="pick-name">{store.name}</div>
                <div className="pick-address">{store.address}</div>
                <img
                  src={store.imgUrl}
                  alt={`Store ${store.idx}`}
                  className="pick-detail"
                />
              </Link>
            ))} */}
            {dummyVeryPickItems.map((item) => (
              <Link
                to={`/packagingStatus?storeId=${item.id}`}
                className="very-pick-item"
              >
                <React.Fragment key={item.id}>
                  <div className="pick-detail-wrapper">
                    <img
                      src={item.img}
                      alt="veryPickimg"
                      className="pick-detail"
                    />
                    <div className="pick-info">
                      <div className="pick-name">{item.name}</div>
                      <div className="pick-address">{item.address}</div>
                      <div className="pick-event-info">
                        <img
                          src={eventTextIcon}
                          alt="eventTextIcon"
                          className="pick-eventTextIcon"
                        />
                        <div className="pick-eventText">{item.eventText}</div>
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
  );
}

export default Homepage;
