import React, { useState } from "react";
import caffeeBanner from "../../assets/images/caffee_banner.svg";
import Header from "../../components/views/Header/Header";
import "./style.css";

const StoreDetailPage = () => {
  const menuCategoryItem = [
    "COFFEE",
    "BEVERAGE",
    "TEA",
    "BAKERY",
    "ADE",
    "SMOOTHIE",
    "YOGURT",
    "JUICE",
    "ETC",
  ];

  const menuList = [
    { name: "아메리카노", price: "4,500원" },
    { name: "카페라떼", price: "5,000원" },
    { name: "카푸치노", price: "4,800원" },
    { name: "카라멜 마끼아또", price: "5,300원" },
    { name: "카페모카", price: "5,200원" }, // 5
    { name: "바닐라 라떼", price: "5,200원" },
    { name: "화이트 초콜릿 모카", price: "5,500원" },
    { name: "헤이즐넛 라떼", price: "5,500원" },
    { name: "카라멜 라떼", price: "5,500원" },
    { name: "카페모카 프라푸치노", price: "5,500원" }, // 10
    { name: "카라멜 프라푸치노", price: "5,500원" },
    { name: "모카 프라푸치노", price: "5,500원" },
    { name: "그린 티 프라푸치노", price: "5,500원" },
    { name: "화이트 초콜릿 프라푸치노", price: "5,500원" },
    { name: "자바 칩 프라푸치노", price: "5,500원" }, // 15
    { name: "헤이즐넛 프라푸치노", price: "5,500원" },
    { name: "초콜릿 크림 칩 프라푸치노", price: "5,500원" },
    { name: "초콜릿 프라푸치노", price: "5,500원" },
    { name: "바닐라 크림 프라푸치노", price: "5,500원" },
    { name: "딸기 요거트 프라푸치노", price: "5,500원" }, // 20
    { name: "망고 바나나 프라푸치노", price: "5,500원" },
    { name: "자바 칩 크림 프라푸치노", price: "5,500원" },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="store-detail-page">
      <Header />
      <div className="store-detail-page__banner">
        <img
          className="store-detail-page__bannerImg"
          src={caffeeBanner}
          alt="caffee banner"
        />
      </div>

      <div className="store-detail-page__caffeeInfo">
        <div className="store-detail-page__caffeeInfo__title">{"카페명"}</div>

        <div className="store-detail-page__caffeeInfo__list">
          <text className="store-detail-page__caffeeInfo__list__title">
            {"연락처"}
          </text>
          <text className="store-detail-page__caffeeInfo__contact">
            {"010-1234-5678"}
          </text>
        </div>

        <div
          className="store-detail-page__caffeeInfo__list"
          style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
        >
          <text className="store-detail-page__caffeeInfo__list__title">
            {"주소"}
          </text>
          <text className="store-detail-page__caffeeInfo__address">
            {"서울시 강남구 테헤란로 427"}
          </text>
        </div>

        <div
          className="store-detail-page__caffeeInfo__list"
          style={{ marginBottom: "1.37rem" }}
        >
          <text className="store-detail-page__caffeeInfo__list__title">
            {"영업 시간"}
          </text>
          <text className="store-detail-page__caffeeInfo__time">
            {"주중 9:30 - 22:30, 토요일 10:00 - 22:00, 일요일 휴무"}
          </text>
        </div>
      </div>

      <div className="store-detail-page__menuCategory">
        {menuCategoryItem.map((item, index) => (
          <span
            key={index}
            className={`store-detail-page__menuCategory__item ${
              selectedItem === item ? "selected" : ""
            }`}
            onClick={() => setSelectedItem(item)}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="store-detail-page__menuList">
        {menuList.map((item, index) => (
          <div key={index} className="store-detail-page__menuList__item">
            <div className="store-detail-page__menuList__item__name">
              {item.name}
            </div>
            <div className="store-detail-page__menuList__item__price">
              {item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreDetailPage;
