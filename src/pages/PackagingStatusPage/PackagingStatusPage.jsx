import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import takeIn from "../../assets/images/take_in.svg";
import takeOut from "../../assets/images/take_out.svg";
import Header from "../../components/views/Header/Header";
import "./PackagingStatusPage.css";
import axios from "axios";

const PackagingStatusPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const apiRoot = process.env.REACT_APP_API_ROOT;

  const [event, setEvent] = useState(null);
  useEffect(() => {
    // API 엔드포인트
    const apiUrl = `${apiRoot}/api/v1/store/${storeId}/event`;

    // axios 라이브러리를 사용하여 API에 GET 요청 보내기
    axios
      .get(apiUrl)
      .then((response) => {
        // API 응답을 상태에 저장
        console.log(response.data);
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 두 번째 인자로 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

  return (
    <div className="packaging-status-page">
      <Header headerProps={{ pageName: "", isClose: false, linkTo: "/" }} />
      <div className="packaging-status-page__title">어떻게 준비해드릴까요?</div>
      <div className="packaging-status-page__content__title">
        수령방식을 선택해주세요
      </div>

      <img
        className="packaging-status-page__event-img"
        src={event?.eventImgUrl}
        alt="promotion"
      />

      <Link
        to={`/store?storeId=${storeId}&inout=1`}
        style={{ textDecoration: "none" }}
      >
        <div className="packaging-status-page__btn">
          <img
            className="packaging-status-page__btn__img"
            src={takeIn}
            alt="takeOut"
          />
          <span className="packaging-status-page__text">먹고갈게요 </span>
        </div>
      </Link>

      <Link
        to={`/store?storeId=${storeId}&inout=2`}
        style={{ textDecoration: "none" }}
      >
        <div className="packaging-status-page__btn">
          <img
            className="packaging-status-page__btn__img"
            src={takeOut}
            alt="takeOut"
          />
          <span className="packaging-status-page__text">가져갈게요</span>
          <span className="packaging-status-page__event">
            ({event?.takeOutEvent})
          </span>
        </div>
      </Link>
    </div>
  );
};
export default PackagingStatusPage;
