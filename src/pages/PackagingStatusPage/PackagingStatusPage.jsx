import React from "react";
import Header from "../../components/views/Header/Header";
import takeOut from "../../assets/images/take_out.svg";
import takeIn from "../../assets/images/take_in.svg";
import promotion from "../../assets/images/promotion.svg";
import "./style.css";
import { Link, useLocation } from "react-router-dom";

const PackagingStatusPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");

  return (
    <div className="packaging-status-page">
      <Header />
      <div className="packaging-status-page__title">어떻게 준비해드릴까요?</div>
      <div className="packaging-status-page__content__title">
        수령방식을 선택해주세요
      </div>

      <img
        className="packaging-status-page__promotion"
        src={promotion}
        alt="promotion"
      />

      <Link
        to={`/storeDetail?storeId=${storeId}&inout=2`}
        style={{ textDecoration: "none" }}
      >
        <div className="packaging-status-page__btn">
          <img
            className="packaging-status-page__btn__img"
            src={takeOut}
            alt="takeOut"
          />
          <span className="packaging-status-page__text">가져갈게요</span>
        </div>
      </Link>

      <Link
        to={`/storeDetail?storeId=${storeId}&inout=1`}
        style={{ textDecoration: "none" }}
      >
        <div className="packaging-status-page__btn">
          <img
            className="packaging-status-page__btn__img"
            src={takeIn}
            alt="takeOut"
          />
          <span className="packaging-status-page__text">먹고갈게요</span>
        </div>
      </Link>
    </div>
  );
};
export default PackagingStatusPage;
