import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import noImageMenu from "../../assets/images/no_image_menu.svg";
import toggleDown from "../../assets/images/toggle_down.svg";
import toggleUp from "../../assets/images/toggle_up.svg";
import Header from "../../components/views/Header/Header";
import "./style.css";

const OrderProcessPage = () => {
  const baseUrl = 'https://test.readyvery.com';
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  // const foodie_id = params.get("foodie_id");
  
  const fetchData = async () => {
    try{
      const response = axios.get(
        `${baseUrl}/api/v1/order/${storeId}?foody_id=1&inout=${inout}`,
        {withCredentials: true}
      );
      console.log(response);
    } catch(error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);

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

  const foodOptionInfo = {
    name:"에스프레소",
    imgUrl:null,
    price:2500,
    category:
    [
      {
        name:"HOT/ICE",
        essential:true,
        options:[
          {"idx":1,"name":"HOT","price":0},
          {"idx":2,"name":"ICE","price":500}
        ]
      },
      {
        name:"샷추가",
        essential:true,
        options:[
          {"idx":3,"name":"연하게","price":0},
          {"idx":4,"name":"1샷 추가","price":500}
        ]
      },
      {
        name:"휘핑",
        essential:false,
        options:[
          {"idx":6,"name":"휘핑추가","price":1000}
        ]
      }
    ]
  };

  const [activeToggles, setActiveToggles] = useState(
    foodOptionInfo.category.map((_, i) => i === 0)
  );
  const [selectedRadioTexts, setSelectedRadioTexts] = useState(
    foodOptionInfo.category.map((e) => `${e.options[0].name}`)
  );
  const [totalAmount, setTotalAmount] = useState(
    foodOptionInfo.price + parseInt(foodOptionInfo.category.map((e) => parseInt(e.options[0].price)).reduce((prev, curr) => prev + curr, 0))
  );
  const [prevRadioPrice, setPrevRadioPrice] = useState(
    foodOptionInfo.category.map(() => 0)
  );

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

    setTotalAmount((prevAmount) => prevAmount - prevRadioPrice[index] + price);

    setPrevRadioPrice((prevPrices) => {
      const prices = [...prevPrices];
      prices[index] = price;
      return prices;
    });
  };

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
        <img src={foodOptionInfo.imgUrl || noImageMenu} alt="menuImg" />
      </div>

      <div className="order-process-page__menu__name">
        {foodOptionInfo.name}
      </div>

      <div className="order-process-page__toggle">
        {foodOptionInfo.category.map((category, index) => (
          <div className="order-process-page__toggle__container" key={index}>
            <div
              className="order-process-page__toggle__header"
              onClick={() => handleToggle(index)}
            >
              <span className="order-process-page__toggle__name">
                {category.name}
              </span>
              <span className="order-process-page__toggle__btn">
                {selectedRadioTexts[index] && (
                  <span className="order-process-page__selected-radio">
                    {selectedRadioTexts[index]}
                  </span>
                )}
                <img
                  className="order-process-page__toggle__header__img"
                  src={activeToggles[index] ? toggleUp : toggleDown}
                  alt={activeToggles[index] ? "Toggle Up" : "Toggle Down"}
                />
              </span>
            </div>

            {activeToggles[index] && (
              <div 
                className={`order-process-page__toggle__body ${activeToggles[index] && "open"}`}
                style={{
                  maxHeight: "100%",
                  paddingTop: "1.56rem",
                  paddingBottom: "1.91rem",
                }}
              >
                {category.options.map((option, optionIndex) => (
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
                      checked={selectedRadioTexts[index] === option.name}
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
      </div>

      <div className="order-process-page__total-amount">
        <text className="order-process-page__total-amount__name">총 금액</text>
        <text className="order-process-page__total-amount__price">
          {String(totalAmount) + "원"}
        </text>
      </div>

      <Link
        to={`/cart?storeId=${storeId}&inout=${inout}`}
        style={{ textDecoration: "none" }}
      >
        <div className="order-process-page__cart__btn">장바구니 담기</div>
      </Link>
    </div>
  );
};

export default OrderProcessPage;
