import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/views/Header/Header";
import useFetchCartCount from "../../hooks/useFetchCartCount";
import useFetchCartData from "../../hooks/useFetchCartData";
import useFetchStoreInfo from "../../hooks/useFetchStoreInfo";
import useFetchStoreMenu from "../../hooks/useFetchStoreMenu";
import "./StoreDetailPage.css";

const StoreDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeIdParam = params.get("storeId");
  const inout = params.get("inout");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { address, imgs, name, openTime, phone, status, eventMessage } =
    useFetchStoreInfo(storeIdParam);
  const menu = useFetchStoreMenu(storeIdParam, inout);
  const { cartIdApi, carts, storeId, totalPrice } = useFetchCartData();
  const totalCount = useFetchCartCount();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  // 축제용
  const boothLinkTo = params.get("storeId") >= 10 
  ? "/booth"
  : `/packagingStatus?storeId=${storeIdParam}`;

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
          linkTo: boothLinkTo,
        }}
      />

      <div className="store-detail-page__scroll">
        <img
          className="store-detail-page__banner"
          src={imgs?.[0]}
          alt="caffee banner"
        />

        <div className="store-detail-page__caffeeInfo">
          <div className="store-detail-page__caffeeInfo__header">
            <span className="store-detail-page__caffeeInfo__title">{name}</span>
            {/* <span className="store-detail-page__caffeeInfo__origin">
              원산지 표시
            </span> */}
          </div>

          <div className="store-detail-page__caffeeInfo__list">
            <span className="store-detail-page__caffeeInfo__list__title">
              연락처
            </span>
            {phone}
          </div>

          <div className="store-detail-page__caffeeInfo__list">
            <span className="store-detail-page__caffeeInfo__list__title">
              주소
            </span>
            {address}
          </div>

          <div className="store-detail-page__caffeeInfo__list">
            <span className="store-detail-page__caffeeInfo__list__title">
              영업 시간
            </span>
            {openTime.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="store-detail-page__event">{eventMessage}</div>

        <div className="store-detail-page__menuCategory">
          {/* <img
            src={goLeft}
            alt="L"
            className="store-detail-page__menuCategory__go-left"
            // onClick={handleGoLeft}
          /> */}

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

          {/* <img
            src={goRight}
            alt="R"
            className="store-detail-page__menuCategory__go-right"
            // onClick={handleGoRight}
          /> */}
        </div>

        <div className="store-detail-page__menuList">
          {selectedCategory &&
          selectedCategory.menuItems &&
          Array.isArray(selectedCategory.menuItems) ? (
            selectedCategory.menuItems.map((item, index) => (
              <div
                className="store-detail-page__menuList__item"
                key={index}
                onClick={() =>
                  navigate(
                    `/order?storeId=${storeIdParam}&inout=${inout}&foodie_id=${item.foodyId}&status=${status}`
                  )
                }
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
              </div>
            ))
          ) : (
            <p>Loading menu...</p>
          )}
        </div>

        {storeId === parseInt(storeIdParam) && carts.length > 0 && (
          <div
            className="store-detail-page__cart-btn"
            onClick={() =>
              navigate(
                `/cart?storeId=${storeId}&inout=${inout}&cartId=${cartIdApi}`
              )
            }
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
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetailPage;
