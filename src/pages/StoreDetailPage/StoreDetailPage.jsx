import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/views/Header/Header";
import "./StoreDetailPage.css";
import useFetchStoreInfo from "../../hooks/useFetchStoreInfo";
import useFetchStoreMenu from "../../hooks/useFetchStoreMenu";
import useFetchCartData from "../../hooks/useFetchCartData";
import useFetchCartCount from "../../hooks/useFetchCartCount";

const StoreDetailPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeIdParam = params.get("storeId");
  const inout = params.get("inout");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { address, imgs, storeName, openTime, phone, status } =
    useFetchStoreInfo(storeIdParam);
  const menu = useFetchStoreMenu(storeIdParam, inout);
  const { cartIdApi, carts, storeId, totalPrice } = useFetchCartData();
  const totalCount = useFetchCartCount();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (menu && menu.menu && menu.menu.length > 0) {
      setSelectedCategory(menu.menu[0]);
    }
  }, [menu]);

  return (
    <div className="store-detail-page">
      <Header
        headerProps={{
          pageName: "",
          isClose: false,
          linkTo: `/packagingStatus?storeId=${storeId}`,
        }}
      />

      <div className="store-detail-page__scroll">
        <img
          className="store-detail-page__banner"
          src={imgs?.[0]}
          alt="caffee banner"
        />

        <div className="store-detail-page__caffeeInfo">
          <div className="store-detail-page__caffeeInfo__title">
            {storeName}
          </div>

          <div className="store-detail-page__caffeeInfo__list">
            <text className="store-detail-page__caffeeInfo__list__title">
              {"연락처"}
            </text>
            <text className="store-detail-page__caffeeInfo__contact">
              {phone}
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
              {address}
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
              {openTime.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </text>
          </div>
        </div>

        <div className="store-detail-page__menuCategory">
          <img
            // src={goLeft}
            alt="L"
            className="store-detail-page__menuCategory__go-left"
            // onClick={handleGoLeft}
          />

          <div className="store-detail-page__menuCategory-scroll">
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
              <p>Loading category...</p>
            )}
          </div>

          <img
            // src={goRight}
            alt="R"
            className="store-detail-page__menuCategory__go-right"
            // onClick={handleGoRight}
          />
        </div>

        <div className="store-detail-page__menuList">
          {selectedCategory &&
          selectedCategory.menuItems &&
          Array.isArray(selectedCategory.menuItems) ? (
            selectedCategory.menuItems.map((item, index) => (
              <Link
                to={`/order?storeId=${storeIdParam}&inout=${inout}&foodie_id=${item.foodyId}&status=${status}`}
                key={index}
                className="store-detail-page__menuList__item"
              >
                <div className="store-detail-page__menuList__item__name">
                  {item?.name}
                  {item?.hit && (
                    <span className="store-detail-page__menuList__item__hit">
                      HIT
                    </span>
                  )}
                </div>
                {inout === "2" && item?.price !== item?.sale ? (
                  <div>
                    <span className="store-detail-page__menuList__item__cost">
                      {item?.price &&
                        (item?.price)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
                    </span>
                    <span className="store-detail-page__menuList__item__sale">
                      {item?.sale &&
                        (item?.sale)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
                    </span>
                  </div>
                ) : (
                  <div className="store-detail-page__menuList__item__price">
                    {item?.price &&
                      (item?.price)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
                  </div>
                )}
              </Link>
            ))
          ) : (
            <p>Loading menu...</p>
          )}
        </div>

        {storeId === parseInt(storeIdParam) && carts.length > 0 && (
          <Link
            to={`/cart?storeId=${storeId}&inout=${inout}&cartId=${cartIdApi}`}
            className="store-detail-page__cart-btn"
          >
            <span className="store-detail-page__total-quantity">
              {totalCount}
            </span>
            <span className="store-detail-page__cart-text">장바구니</span>
            <span className="store-detail-page__total-price">
              {totalPrice &&
                totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  "원"}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StoreDetailPage;
