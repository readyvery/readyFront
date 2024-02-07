import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/views/Header/Header";
import "./PackagingStatusPage.css";
import { IMAGES } from "../../constants/images";
import useFetchEvent from "../../hooks/useFetchEvent";

const PackagingStatusPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const eventImgUrl = useFetchEvent(storeId);

  // useEffect(() => {
  //   // API 엔드포인트
  //   const apiUrl = `${apiRoot}/api/v1/store/${storeId}/event`;

  //   // axios 라이브러리를 사용하여 API에 GET 요청 보내기
  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       // API 응답을 상태에 저장
  //       setEvent(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching store data:", error);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []); // 두 번째 인자로 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

  return (
    <div className="packaging-status-page">
      <Header headerProps={{ pageName: "", isClose: false, linkTo: "/" }} />
      <div className="packaging-status-page__title">어떻게 준비해드릴까요?</div>
      <div className="packaging-status-page__content__title">
        수령방식을 선택해주세요
      </div>

      <img
        className="packaging-status-page__event-img"
        src={eventImgUrl}
        alt="promotion"
      />

      <div
        className="packaging-status-page__btn"
        onClick={() => navigate(`/store?storeId=${storeId}&inout=1`)}
      >
        <img
          className="packaging-status-page__btn__img"
          src={IMAGES.takeIn}
          alt="takeOut"
        />
        <span className="packaging-status-page__text">먹고갈게요</span>
      </div>

      <div
        className="packaging-status-page__btn"
        onClick={() => navigate(`/store?storeId=${storeId}&inout=2`)}
      >
        <img
          className="packaging-status-page__btn__img"
          src={IMAGES.takeOut}
          alt="takeOut"
        />
        <span className="packaging-status-page__text">가져갈게요</span>
        {/* <span className="packaging-status-page__event">{takeOutEvent}</span> */}
      </div>

      <div className="packaging-status-page__notice">
        픽업 시 매장에서 일회용 컵 사용 불가능합니다
      </div>
    </div>
  );
};
export default PackagingStatusPage;
