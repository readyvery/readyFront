import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import goLeft from "../../assets/images/go_left.svg";
import goRight from "../../assets/images/go_right.svg";
import Header from "../../components/views/Header/Header";
import "./StoreDetailPage.css";

const StoreDetailPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const [caffeeInfo, setCaffeeInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [menu, setMenu] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState(null);

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

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${apiRoot}/api/v1/order/cart`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.carts.length > 0) {
            setHasResponse(true);
            setTotalPrice(response.data.totalPrice);
            setCart(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
          // 만약 에러가 발생하면 false를 설정
          setHasResponse(false);
        });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiRoot, inout]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiRoot}/api/v1/order/cart/count`, {
          withCredentials: true,
        });
        setTotalCount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          src={caffeeInfo?.imgs?.[0]}
          alt="caffee banner"
        />

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
              {caffeeInfo?.openTime.split("\n").map((line, index) => (
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
            src={goLeft}
            alt="L"
            className="store-detail-page__menuCategory__go-left"
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
            src={goRight}
            alt="R"
            className="store-detail-page__menuCategory__go-right"
          />
        </div>

        <div className="store-detail-page__menuList">
          {selectedCategory &&
          selectedCategory.menuItems &&
          Array.isArray(selectedCategory.menuItems) ? (
            selectedCategory.menuItems.map((item, index) => (
              <Link
                to={`/order?storeId=${storeId}&inout=${inout}&foodie_id=${item.foodyId}&status=${caffeeInfo?.status}`}
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

        {hasResponse && cart.storeId === parseInt(storeId) && (
          <Link
            to={`/cart?storeId=${storeId}&inout=${inout}&cartId=${cart.cartId}`}
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
