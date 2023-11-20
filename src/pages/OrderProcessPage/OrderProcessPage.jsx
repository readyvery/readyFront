import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import noImageMenu from "../../assets/images/no_image_menu.svg";
import toggleDown from "../../assets/images/toggle_down.svg";
import toggleUp from "../../assets/images/toggle_up.svg";
import Header from "../../components/views/Header/Header";
import "./style.css";

const OrderProcessPage = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  // const foodie_id = params.get("foodie_id");
  const [optionOpen, setOptionOpen] = useState(false);
  const [foodOptionInfo, setFoodOptionInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ROOT}/api/v1/order/${storeId}?foody_id=7&inout=${inout}`,
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
      foodieId: 7,
      options: [7, 9],
      count: 1,
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

  // const foodOptionInfo = {
  //   name: "아메리카노",
  //   imgUrl: "adfs",
  //   price: 3000,
  //   category: [
  //     [
  //       {
  //         name: "ICE/HOT",
  //         essential: false,
  //         options: [
  //           {
  //             idx: 1,
  //             name: "ICE",
  //             price: 1000,
  //           },
  //           {
  //             idx: 2,
  //             name: "HOT",
  //             price: 0,
  //           },
  //         ],
  //       },
  //       {
  //         name: "사이즈",
  //         essential: true,
  //         options: [
  //           {
  //             idx: 32,
  //             name: "작은거",
  //             price: 1000,
  //           },
  //           {
  //             idx: 34,
  //             name: "큰거",
  //             price: 1000,
  //           },
  //           {
  //             idx: 44,
  //             name: "아주 큰거",
  //             price: 3000,
  //           },
  //         ],
  //       },
  //     ],
  //   ],
  // };

  // const foodOptionInfo = {
  //   name:"에스프레소",
  //   imgUrl:null,
  //   price:2500,
  //   category:
  //   [
  //     {
  //       name:"HOT/ICE",
  //       essential:true,
  //       options:[
  //         {"idx":1,"name":"HOT","price":0},
  //         {"idx":2,"name":"ICE","price":500}
  //       ]
  //     },
  //     {
  //       name:"샷추가",
  //       essential:true,
  //       options:[
  //         {"idx":3,"name":"연하게","price":0},
  //         {"idx":4,"name":"1샷 추가","price":500}
  //       ]
  //     },
  //     {
  //       name:"휘핑",
  //       essential:false,
  //       options:[
  //         {"idx":6,"name":"휘핑추가","price":1000}
  //       ]
  //     }
  //   ]
  // };

  // foodOptionInfo?.category?.map((_, i) => i === 0)
  const [activeToggles, setActiveToggles] = useState(
    foodOptionInfo?.category?.map(() => false)
  );
  const [selectedRadioTexts, setSelectedRadioTexts] = useState(
    foodOptionInfo &&
      foodOptionInfo.category?.map((e) => `${e.options[0]?.name}`)
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
      foodOptionInfo?.category?.filter((e) => e.essential).map(() => false)
    );
    setSelectedRadioTexts(
      foodOptionInfo.category?.map((e) => `${e.options[0]?.name}`)
    );
    setTotalAmount(
      foodOptionInfo?.price +
        parseInt(
          foodOptionInfo?.category
            ?.map((e) => parseInt(e?.options[0]?.price))
            .reduce((prev, curr) => prev + curr, 0)
        )
    );
    setPrevRadioPrice(
      foodOptionInfo?.category?.map((e) => e?.options[0]?.price)
    );
    setOptionIdx(
      foodOptionInfo?.category
        ?.filter((el) => el?.essential)
        .map((e) => e?.options[0]?.idx)
    );
  }, [foodOptionInfo]);

  const handleToggle = (index) => {
    setActiveToggles((prevToggles) => {
      const toggles = [...prevToggles];
      toggles[index] = !toggles[index];
      return toggles;
    });
  };

  const handleRadioChange = (index, text, price) => {
    setSelectedRadioTexts((prevTexts) => {
      const texts = [...prevTexts];
      texts[index] = text;
      return texts;
    });

    setTotalAmount(
      (prevAmount) =>
        prevAmount - prevRadioPrice?.length && prevRadioPrice[index] + price
    );

    setPrevRadioPrice((prevPrices) => {
      const prices = [...prevPrices];
      prices[index] = price;
      return prices;
    });
    console.log(optionIdx);
  };

  // const handleOptionChange = (idx, text, price) => {
  //   setTotalAmount((prevAmount) => prevAmount - prevRadioPrice[index] + price);

  //   setPrevRadioPrice((prevPrices) => {
  //     const prices = [...prevPrices];
  //     prices[index] = price;
  //     return prices;
  //   });
  // }

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
        <img src={foodOptionInfo?.imgUrl || noImageMenu} alt="menuImg" />
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
                  className="order-process-page__toggle__header"
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
                    className={`order-process-page__toggle__body ${
                      activeToggles?.length && activeToggles[index] && "open"
                    }`}
                    style={{
                      maxHeight: "100%",
                      paddingTop: "1.56rem",
                      paddingBottom: "1.91rem",
                    }}
                  >
                    {category?.options?.map((option, optionIndex) => (
                      <div
                        className="order-process-page__toggle__body__radio"
                        key={optionIndex}
                        style={{
                          marginBottom:
                            index === category.options.length - 1
                              ? "0"
                              : "1.56rem",
                        }}
                      >
                        <input
                          type="radio"
                          name={`radio_${index}`}
                          value={optionIndex}
                          checked={
                            selectedRadioTexts?.length &&
                            selectedRadioTexts[index] === option.name
                          }
                          onChange={() =>
                            handleRadioChange(index, option.name, option.price)
                          }
                        />
                        <label htmlFor={`radio_${index}_${optionIndex}`}>
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

        <div className="order-process-page__toggle__container">
          <div
            className="order-process-page__toggle__header option"
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
            className={`order-process-page__toggle__body`}
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
                    <span className="order-process-page__toggle__btn">
                      {selectedRadioTexts?.length &&
                        selectedRadioTexts[index] && (
                          <span className="order-process-page__selected-radio">
                            {category.name}
                          </span>
                        )}
                    </span>
                    {category?.options?.map((option, i) => (
                      <React.Fragment key={option.idx}>
                        <label htmlFor={`option_${option.idx}`}>
                          {option.name}
                        </label>
                        <input
                          type="checkbox"
                          name={`option_${option.idx}`}
                          // onChange={() =>
                          //   handleRadioChange(option.idx, option.name, option.price)
                          // }
                        />
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
          </div>
          {/* {activeToggles?.length && activeToggles[index] && (
              <div 
                className={`order-process-page__toggle__body ${activeToggles?.length && activeToggles[index] && "open"}`}
                style={{
                  maxHeight: "100%",
                  paddingTop: "1.56rem",
                  paddingBottom: "1.91rem",
                }}
              >
                {category?.options?.map((option, optionIndex) => (
                  <div
                    className="order-process-page__toggle__body__radio"
                    key={optionIndex}
                    style={{
                      marginBottom:
                        index === category.options.length - 1 ? "0" : "1.56rem",
                    }}
                  >
                    <input
                      type="radio"
                      name={`radio_${index}`}
                      value={optionIndex}
                      checked={selectedRadioTexts?.length && selectedRadioTexts[index] === option.name}
                      onChange={() =>
                        handleRadioChange(index, option.name, option.price)
                      }
                    />
                    <label htmlFor={`radio_${index}_${optionIndex}`}>
                      {option.name}
                    </label>
                  </div>
                ))}
              </div>
            )}  */}
        </div>
      </div>

      <div className="order-process-page__total-amount">
        <text className="order-process-page__total-amount__name">총 금액</text>
        <text className="order-process-page__total-amount__price">
          {String(totalAmount) + "원"}
        </text>
      </div>

      {/* <Link
        to={`/cart?storeId=${storeId}&inout=${inout}`}
        style={{ textDecoration: "none" }}
      >
        <div className="order-process-page__cart__btn">장바구니 담기</div>
      </Link> */}

      <div className="order-process-page__cart__btn" onClick={handleCartReset}>
        주문하기
      </div>
    </div>
  );
};

export default OrderProcessPage;
