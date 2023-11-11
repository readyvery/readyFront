import React, { useState } from "react";
import caffeeBanner from "../../assets/images/caffee_banner.svg";
import Header from "../../components/views/Header/Header";
import "./style.css";
import { Link, useLocation } from "react-router-dom";

const StoreDetailPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");

  const caffeeInfo = {
    imgs: ["url1", "url2"],
    name: "카페 오르다",
    phone: "010-1234-1234",
    address: "위치",
    openTime: "영업시간",
  };

  const menu = [
    {
      categoryId: 1,
      category: "COFFEE",
      foodies: [
        {
          foodyId: 1,
          name: "카페라떼",
          imgUrl: "https://asf",
          price: 4000,
          sale: 2000,
        },
        {
          foodyId: 2,
          name: "아메리카노",
          imgUrl: "https://asf",
          price: 2500,
          hit: true,
        },
        { foodyId: 3, name: "바닐라 라떼", imgUrl: "https://asf", price: 5000 },
        { foodyId: 4, name: "토피넛 라떼", imgUrl: "https://asf", price: 5000 },
        { foodyId: 5, name: "돌체 라떼", imgUrl: "https://asf", price: 5300 }, // 5
        {
          foodyId: 6,
          name: "카라멜마끼아또",
          imgUrl: "https://asf",
          price: 4800,
        },
        {
          foodyId: 7,
          name: "코코넛 카페라떼",
          imgUrl: "https://asf",
          price: 5300,
        },
        { foodyId: 8, name: "에스프레소", imgUrl: "https://asf", price: 2500 },
        { foodyId: 9, name: "카푸치노", imgUrl: "https://asf", price: 4000 },
        {
          foodyId: 10,
          name: "헤이즐넛 라떼",
          imgUrl: "https://asf",
          price: 4800,
        },
        { foodyId: 11, name: "카페모카", imgUrl: "https://asf", price: 5000 },
        {
          foodyId: 12,
          name: "베트남 커피",
          imgUrl: "https://asf",
          price: 4500,
        },
        { foodyId: 13, name: "아포카토", imgUrl: "https://asf", price: 5500 },
      ],
    },
    {
      categoryId: 2,
      category: "NON COFFEE",
      foodies: [
        {
          foodyId: 1,
          name: "피치 요거트 라떼",
          imgUrl: "https://asf",
          price: 5000,
        },
        {
          foodyId: 2,
          name: "미숫가루 라떼",
          imgUrl: "https://asf",
          price: 5000,
        },
        { foodyId: 3, name: "딸기 라떼", imgUrl: "https://asf", price: 5800 },
        { foodyId: 4, name: "죠리퐁 라떼", imgUrl: "https://asf", price: 5000 },
        { foodyId: 5, name: "코코볼 라떼", imgUrl: "https://asf", price: 5000 }, // 5
        { foodyId: 6, name: "녹차 라떼", imgUrl: "https://asf", price: 4800 },
        { foodyId: 7, name: "초코 라떼", imgUrl: "https://asf", price: 4800 },
        { foodyId: 8, name: "고구마 라떼", imgUrl: "https://asf", price: 5000 },
        { foodyId: 9, name: "밀크티 라떼", imgUrl: "https://asf", price: 4800 },
        { foodyId: 10, name: "핫바닐라", imgUrl: "https://asf", price: 4800 }, // 10
        { foodyId: 11, name: "핫코코넛", imgUrl: "https://asf", price: 4800 },
      ],
    },
    {
      categoryId: 3,
      category: "TEA",
      foodies: [
        {
          foodyId: 1,
          name: "청귤(청) - HOT",
          imgUrl: "https://asf",
          price: 4800,
        },
        {
          foodyId: 2,
          name: "청귤(청) - ICE",
          imgUrl: "https://asf",
          price: 5300,
        },
        {
          foodyId: 3,
          name: "유자(청) - HOT",
          imgUrl: "https://asf",
          price: 4800,
        },
        {
          foodyId: 4,
          name: "유자(청) - ICE",
          imgUrl: "https://asf",
          price: 5300,
        },
        {
          foodyId: 5,
          name: "황귤(청) - HOT",
          imgUrl: "https://asf",
          price: 4800,
        },
        {
          foodyId: 6,
          name: "황귤(청) - ICE",
          imgUrl: "https://asf",
          price: 5300,
        },
        {
          foodyId: 7,
          name: "자몽(청) - HOT",
          imgUrl: "https://asf",
          price: 4800,
        },
        {
          foodyId: 8,
          name: "자몽(청) - ICE",
          imgUrl: "https://asf",
          price: 5300,
        },
        {
          foodyId: 9,
          name: "레몬(청) - HOT",
          imgUrl: "https://asf",
          price: 4800,
        },
        {
          foodyId: 10,
          name: "레몬(청) - ICE",
          imgUrl: "https://asf",
          price: 5300,
        },
        {
          foodyId: 11,
          name: "매실(청) - HOT",
          imgUrl: "https://asf",
          price: 4800,
        },
        {
          foodyId: 12,
          name: "매실(청) - ICE",
          imgUrl: "https://asf",
          price: 5300,
        },
        {
          foodyId: 13,
          name: "캐모마일(티백) - HOT",
          imgUrl: "https://asf",
          price: 3000,
        },
        {
          foodyId: 14,
          name: "캐모마일(티백) - ICE",
          imgUrl: "https://asf",
          price: 3500,
        },
        {
          foodyId: 15,
          name: "루이보스(티백) - HOT",
          imgUrl: "https://asf",
          price: 3000,
        },
        {
          foodyId: 16,
          name: "루이보스(티백) - ICE",
          imgUrl: "https://asf",
          price: 3500,
        },
        {
          foodyId: 17,
          name: "얼그레이(티백) - HOT",
          imgUrl: "https://asf",
          price: 3000,
        },
        {
          foodyId: 18,
          name: "얼그레이(티백) - ICE",
          imgUrl: "https://asf",
          price: 3500,
        },
        {
          foodyId: 19,
          name: "페퍼민트(티백) - HOT",
          imgUrl: "https://asf",
          price: 3000,
        },
        {
          foodyId: 20,
          name: "페퍼민트(티백) - ICE",
          imgUrl: "https://asf",
          price: 3500,
        },
        {
          foodyId: 21,
          name: "바닐라(티백) - HOT",
          imgUrl: "https://asf",
          price: 3000,
        },
        {
          foodyId: 22,
          name: "바닐라(티백) - ICE",
          imgUrl: "https://asf",
          price: 3500,
        },
      ],
    },
    {
      categoryId: 4,
      category: "WAFFLE",
      foodies: [
        { foodyId: 1, name: "플레인 와플", imgUrl: "https://asf", price: 2500 },
        {
          foodyId: 2,
          name: "생크림 생딸기 와플",
          imgUrl: "https://asf",
          price: 5500,
        },
        {
          foodyId: 3,
          name: "생크림 초코 오레오 와플",
          imgUrl: "https://asf",
          price: 4500,
        },
        {
          foodyId: 4,
          name: "티라미슈 와플",
          imgUrl: "https://asf",
          price: 4000,
        },
        {
          foodyId: 5,
          name: "말차 티라미슈 와플",
          imgUrl: "https://asf",
          price: 4000,
        },
        { foodyId: 6, name: "생크림 와플", imgUrl: "https://asf", price: 3500 },
        {
          foodyId: 7,
          name: "애플시나몬 와플",
          imgUrl: "https://asf",
          price: 3700,
        },
        {
          foodyId: 8,
          name: "블루베리 와플",
          imgUrl: "https://asf",
          price: 4000,
        },
        {
          foodyId: 9,
          name: "블루베리 크림치즈 와플",
          imgUrl: "https://asf",
          price: 4300,
        },
        {
          foodyId: 10,
          name: "누텔라 와플",
          imgUrl: "https://asf",
          price: 4300,
        },
        {
          foodyId: 11,
          name: "애플시나몬 크림치즈 와플",
          imgUrl: "https://asf",
          price: 4000,
        },
        {
          foodyId: 12,
          name: "아이스크림 와플 (바닐라/초코/녹차)",
          imgUrl: "https://asf",
          price: 5000,
        },
      ],
    },
    {
      categoryId: 5,
      category: "CROFFLE",
      foodies: [
        {
          foodyId: 1,
          name: "플레인 크로플",
          imgUrl: "https://asf",
          price: 2800,
        },
        {
          foodyId: 2,
          name: "티라미슈 크로플",
          imgUrl: "https://asf",
          price: 4300,
        },
        {
          foodyId: 3,
          name: "말차 티라미슈 크로플",
          imgUrl: "https://asf",
          price: 4300,
        },
        {
          foodyId: 4,
          name: "생크림 크로플",
          imgUrl: "https://asf",
          price: 3800,
        },
        {
          foodyId: 5,
          name: "애플시나몬 크로플",
          imgUrl: "https://asf",
          price: 4000,
        },
        {
          foodyId: 6,
          name: "누텔라 크로플",
          imgUrl: "https://asf",
          price: 4500,
        },
        {
          foodyId: 7,
          name: "애플시나몬 크림치즈 크로플",
          imgUrl: "https://asf",
          price: 4300,
        },
        {
          foodyId: 8,
          name: "블루베리 크림치즈 크로플",
          imgUrl: "https://asf",
          price: 4800,
        },
        { name: "생크림 생딸기 크로플", imgUrl: "https://asf", price: 6000 },
        {
          foodyId: 9,
          name: "아이스크림 크로플 (바닐라/초코/녹차)",
          imgUrl: "https://asf",
          price: 5500,
        },
      ],
    },
    {
      categoryId: 6,
      category: "BAKERY",
      foodies: [
        { name: "허니브레드", imgUrl: "https://asf", price: 5500 },
        { name: "크로크무슈", imgUrl: "https://asf", price: 5800 },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(menu[0]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

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
        <div className="store-detail-page__caffeeInfo__title">
          {caffeeInfo.name}
        </div>

        <div className="store-detail-page__caffeeInfo__list">
          <text className="store-detail-page__caffeeInfo__list__title">
            {"연락처"}
          </text>
          <text className="store-detail-page__caffeeInfo__contact">
            {caffeeInfo.phone}
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
            {caffeeInfo.address}
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
            {caffeeInfo.openTime}
          </text>
        </div>
      </div>
      <div className="store-detail-page__menuCategory">
        {menu.map((category, index) => (
          <span
            key={index}
            className={`store-detail-page__menuCategory__item ${
              selectedCategory.categoryId === category.categoryId
                ? "selected"
                : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.category}
          </span>
        ))}
      </div>
      <div className="store-detail-page__menuList">
        {selectedCategory.foodies.map((item, index) => (
          <Link
            to={`/order?storeId=${storeId}&inout=${inout}&foodie_id=${item.foodyId}`}
            key={index}
            className="store-detail-page__menuList__item"
          >
            <div className="store-detail-page__menuList__item__name">
              {item.name}
            </div>
            <div className="store-detail-page__menuList__item__price">
              {String(item.price) + "원"}
            </div>
          </Link>
        ))}
      </div>{" "}
    </div>
  );
};

export default StoreDetailPage;
