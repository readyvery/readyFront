import React, { useState, useEffect } from "react";
import Header from "../../components/views/Header/Header";
import "./StoreDetailPage.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const StoreDetailPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  const apiRoot = process.env.REACT_APP_API_ROOT;

  const [caffeeInfo, setCaffeeInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiRoot}/api/v1/store/${storeId}`);
        setCaffeeInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    // API 엔드포인트
    const apiUrl = `${apiRoot}/api/v1/store/${storeId}/menu?inout=${inout}`;

    // axios 라이브러리를 사용하여 API에 GET 요청 보내기
    axios
      .get(apiUrl)
      .then((response) => {
        // API 응답을 상태에 저장
        setMenu(response.data);
        setSelectedCategory(response.data.menu[0]);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 두 번째 인자로 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="store-detail-page">
      <Header
        headerProps={{
          pageName: "",
          isClose: false,
          linkTo: `/packagingStatus?storeId=${storeId}`,
        }}
      />
      <div className="store-detail-page__banner">
        <img
          className="store-detail-page__bannerImg"
          src={caffeeInfo?.imgs?.[0]}
          alt="caffee banner"
        />
      </div>
      <div className="store-detail-page__caffeeInfo">
        <div className="store-detail-page__caffeeInfo__title">
          {caffeeInfo?.name}
        </div>

        <div className="store-detail-page__caffeeInfo__list">
          <text className="store-detail-page__caffeeInfo__list__title">
            {"연락처"}
          </text>
          <text className="store-detail-page__caffeeInfo__contact">
            {caffeeInfo?.phone}
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
            {caffeeInfo?.address}
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
            {caffeeInfo?.openTime}
          </text>
        </div>
      </div>

      <div className="store-detail-page__menuCategory">
        {menu && menu.menu && Array.isArray(menu.menu) ? (
          menu.menu.map((category, index) => (
            <span
              key={index}
              className={`store-detail-page__menuCategory__item ${
                selectedCategory?.categoryId === category?.categoryId
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category?.category}
            </span>
          ))
        ) : (
          <p>Loading menu...</p>
        )}
      </div>

      <div className="store-detail-page__menuList">
        {selectedCategory &&
        selectedCategory.menuItems &&
        Array.isArray(selectedCategory.menuItems) ? (
          selectedCategory.menuItems.map((item, index) => (
            <Link
              to={`/order?storeId=${storeId}&inout=${inout}&foodie_id=${item.foodyId}`}
              key={index}
              className="store-detail-page__menuList__item"
            >
              <div className="store-detail-page__menuList__item__name">
                {item?.name}
              </div>
              <div className="store-detail-page__menuList__item__price">
                {String(item?.price) + "원"}
              </div>
            </Link>
          ))
        ) : (
          <p>Loading menu items...</p>
        )}
      </div>
    </div>
  );
};

export default StoreDetailPage;
