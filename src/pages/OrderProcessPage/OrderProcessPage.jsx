import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import minus from "../../assets/images/icon_minus.png";
import minusDisabled from "../../assets/images/icon_minus_disabled.png";
import plus from "../../assets/images/icon_plus.png";
import noImageMenu from "../../assets/images/no_image_menu.svg";
import toggleDown from "../../assets/images/toggle_down.svg";
import toggleUp from "../../assets/images/toggle_up.svg";
import Header from "../../components/views/Header/Header";
import "./OrderProcess.css";

const OrderProcessPage = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  const foodieId = params.get("foodie_id");
  const [optionOpen, setOptionOpen] = useState(false);
  const [foodOptionInfo, setFoodOptionInfo] = useState({});
  const [orderCnt, setOrderCnt] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ROOT}/api/v1/order/${storeId}?foody_id=${foodieId}&inout=${inout}`,
          { withCredentials: true }
        );
        console.log(response.data);
        setFoodOptionInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCartReset = () => {
    let body = {
      storeId: storeId,
      foodieId: foodieId,
      options: optionIdx,
      count: orderCnt,
    };
    const apiUrl = `${process.env.REACT_APP_API_ROOT}/api/v1/order/cart/reset`;

    // Axios를 사용한 DELETE 요청
    const response = axios.delete(apiUrl, { withCredentials: true });

    // 성공적으로 처리된 경우에 대한 로직
    console.log("Cart reset successful", response.data);
    axios
      .post(`${process.env.REACT_APP_API_ROOT}/api/v1/order/cart`, body, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/payment?storeId=${storeId}&inout=${inout}`);
      })

      // 여기에서 상태 업데이트 또는 다른 로직 수행 가능
      .catch((error) => {
        // 에러가 발생한 경우에 대한 로직
        console.error("Error resetting cart", error);

        // 에러 상태에 대한 처리를 수행하거나 사용자에게 알림 등을 표시할 수 있습니다.
      });
  };

  const [activeToggles, setActiveToggles] = useState(
    foodOptionInfo?.category?.filter((el) => el?.essential).map(() => false)
  );
  const [selectedRadioTexts, setSelectedRadioTexts] = useState(
    foodOptionInfo &&
      foodOptionInfo.category
        ?.filter((el) => el?.essential)
        .map((e) => `${e.options[0]?.name}`)
  );
  const [totalAmount, setTotalAmount] = useState(
    foodOptionInfo && foodOptionInfo.price && foodOptionInfo?.price
  );
  const [prevRadioPrice, setPrevRadioPrice] = useState(
    foodOptionInfo?.category?.map(() => 0)
  );
  const [optionIdx, setOptionIdx] = useState([]);
  useEffect(() => {
    setActiveToggles(
      foodOptionInfo?.category?.filter((e) => e?.essential).map(() => false)
    );
    setSelectedRadioTexts(
      foodOptionInfo.category
        ?.filter((el) => el?.essential)
        .map((e) => `${e.options[0]?.name}`)
    );
    setTotalAmount(
      orderCnt && orderCnt * (
      foodOptionInfo?.price +
        parseInt(
          foodOptionInfo?.category
            ?.filter((el) => el?.essential)
            .map((e) => parseInt(e?.options[0]?.price))
            .reduce((prev, curr) => prev + curr, 0)
        )
      )
    );
    setPrevRadioPrice(
      foodOptionInfo?.category
        ?.filter((el) => el?.essential)
        .map((e) => e?.options[0]?.price)
    );
    setOptionIdx(
      foodOptionInfo?.category
        ?.filter((el) => el?.essential)
        .map((e) => e?.options[0]?.idx)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodOptionInfo]);

  const handleToggle = (index) => {
    setActiveToggles((prevToggles) => {
      const toggles = [...prevToggles];
      toggles[index] = !toggles[index];
      return toggles;
    });

    // if (!activeToggles[index] && index < activeToggles.length - 1) {
    //   setActiveToggleIndex(index + 1);
    // }
  };

  const handleRadioChange = (index, text, price) => {
    setSelectedRadioTexts((prevTexts) => {
      const texts = [...prevTexts];
      texts[index] = text;
      return texts;
    });

    setTotalAmount((prevAmount) => prevAmount - prevRadioPrice[index] + price);

    setPrevRadioPrice((prevPrices) => {
      const prices = [...prevPrices];
      prices[index] = price;
      return prices;
    });
  };

  const handleOptionChange = (idx, price, e) => {
    e.target.checked
      ? setTotalAmount((prevAmount) => prevAmount + price)
      : setTotalAmount((prevAmount) => prevAmount - price);
    e.target.checked
      ? setOptionIdx((prev) => [...prev, idx])
      : setOptionIdx((prev) => prev.filter((e) => e !== idx));
  };

  const handleCntUp = () => {
    const newOrderCnt = orderCnt + 1;
    setOrderCnt(newOrderCnt);
    setTotalAmount((prev) => prev * newOrderCnt / (newOrderCnt - 1));
  }

  const handleCntDown = () => {
    const newOrderCnt = orderCnt === 1 ? 1 : orderCnt - 1;
    orderCnt > 1 && setTotalAmount((prev) => prev * newOrderCnt / (newOrderCnt + 1));
    setOrderCnt((prev) => prev === 1 ? 1 : newOrderCnt);
  }

  return (
    <div className="order-process-page">
      <Header
        headerProps={{
          pageName: "",
          isClose: false,
          linkTo: `/store?storeId=${storeId}&inout=${inout}`,
        }}
      />

      <div className="order-process-page__menu__img">
        <img
          src={foodOptionInfo?.imgUrl ? foodOptionInfo.imgUrl : noImageMenu}
          alt="menuImg"
        />
      </div>

      <div className="order-process-page__menu__name">
        {foodOptionInfo?.name}
      </div>

      <div className="order-process-page__toggle">
        {foodOptionInfo &&
          foodOptionInfo.category &&
          foodOptionInfo.category
            .filter((c, i) => c?.essential)
            .map((category, index) => (
              <div
                className="order-process-page__toggle__container"
                key={index}
              >
                <div
                  className={`order-process-page__toggle__header ${
                    activeToggles?.length && activeToggles[index] && "open"
                  }`}
                  onClick={() => handleToggle(index)}
                >
                  <span className="order-process-page__toggle__name">
                    {category.name}
                  </span>
                  <span className="order-process-page__toggle__btn">
                    {selectedRadioTexts?.length &&
                      selectedRadioTexts[index] && (
                        <span className="order-process-page__selected-radio">
                          {selectedRadioTexts[index]}
                        </span>
                      )}
                    <img
                      className="order-process-page__toggle__header__img"
                      src={
                        activeToggles?.length && activeToggles[index]
                          ? toggleUp
                          : toggleDown
                      }
                      alt={
                        activeToggles?.length && activeToggles[index]
                          ? "Toggle Up"
                          : "Toggle Down"
                      }
                    />
                  </span>
                </div>

                {activeToggles?.length && activeToggles[index] && (
                  <div
                    className={`order-process-page__toggle__body__container open`}
                    key={index}
                  >
                    {category?.options?.map((option, optionIndex) => (
                      <div
                        className="order-process-page__toggle__body__radio"
                        key={optionIndex}
                      >
                        <label htmlFor={`radio_${index}_${optionIndex}`}>
                          <input
                            type="radio"
                            id={`radio_${index}_${optionIndex}`}
                            name={`radio_${index}_${optionIndex}`}
                            value={optionIndex}
                            checked={
                              selectedRadioTexts?.length &&
                              selectedRadioTexts[index] === option.name
                            }
                            onChange={() =>
                              handleRadioChange(
                                index,
                                option.name,
                                option.price
                              )
                            }
                          />
                          {option.price === 0 ? (
                            <span>{option.name}</span>
                          ) : (
                            <span>{option.name} (+{option.price}원)</span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        {foodOptionInfo?.category?.filter((e) => !e?.essential).length ? (
          <div className="order-process-page__toggle__container">
            <div
              className={`order-process-page__toggle__header ${
                optionOpen && "open"
              }`}
              onClick={() => setOptionOpen((prev) => !prev)}
            >
              <span className="order-process-page__toggle__name">추가옵션</span>
              <img
                className="order-process-page__toggle__header__img"
                src={optionOpen ? toggleUp : toggleDown}
                alt={optionOpen ? "Toggle Up" : "Toggle Down"}
              />
            </div>

            <div
              className={`order-process-page__toggle__body ${
                optionOpen && "open"
              }`}
              style={{
                maxHeight: "100%",
                paddingTop: "1.56rem",
                paddingBottom: "1.91rem",
              }}
            >
              {optionOpen &&
                foodOptionInfo &&
                foodOptionInfo.category &&
                foodOptionInfo.category
                  .filter((c, i) => !c.essential)
                  .map((category, index) => (
                    <React.Fragment key={index}>
                      {index !== 0 && <div className="option__line"></div>}
                      <span className="order-process-page__option__title__wrapper">
                        <span className="order-process-page__option__title">
                          {category.name}
                        </span>
                      </span>
                      {category?.options?.map((option, i) => (
                        <React.Fragment key={option.idx}>
                          <div className="option__checkbox__wrapper">
                            <label htmlFor={`option_${option.idx}`}>
                              <input
                                type="checkbox"
                                id={`option_${option.idx}`}
                                name={`option_${option.idx}`}
                                onChange={(e) =>
                                  handleOptionChange(
                                    option.idx,
                                    option.price,
                                    e
                                  )
                                }
                              />
                              {option.price === 0 ? (
                                <span>{option.name}</span>
                              ) : (
                                <span>{option.name} (+{option.price}원)</span>
                              )}
                            </label>
                          </div>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="order-process-page__toggle__container">
          <div
            className="order-process-page__toggle__header"
          >
            <span className="order-process-page__toggle__name">
              수량
            </span>
            <div className="order-process-page-quantity__wrapper">
              <span className="order-process-page__img__wrapper" onClick={handleCntDown}>
                <img src={orderCnt === 1 ? minusDisabled : minus} alt={orderCnt === 1 ? "minusDisabled" : "minus"}/>
              </span>
              <span className="order-process-page-quantity__txt">{orderCnt}</span>
              <span className="order-process-page__img__wrapper" onClick={handleCntUp}>
                <img src={plus} alt="plus"/>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-process-page__total-amount">
        <text className="order-process-page__total-amount__name">총 금액</text>
        <text className="order-process-page__total-amount__price">
          {String(totalAmount) + "원"}
        </text>
      </div>

      {/* <Link
        to={`/payment?storeId=${storeId}&inout=${inout}`}
        style={{
          display: "flex",
          textDecoration: "none",
          marginBottom: "2rem",
        }}
      >
        <div className="order-btn" onClick={handleCartReset}>
          주문하기
        </div>
      </Link> */}

      <div className="order-process-page__cart__btn" onClick={handleCartReset}>
        주문하기
      </div>
    </div>
  );
};

export default OrderProcessPage;
