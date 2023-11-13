import "./style.css";
import React from "react";
import Header from "../../components/views/Header/Header";
import noImageMenu from "../../assets/images/no_image_menu.svg";
import toggleUp from "../../assets/images/toggle_up.svg";
import toggleDown from "../../assets/images/toggle_down.svg";

const OrderProcessPage = () => {
  const foodOptionInfo = {
    name: "아메리카노",
    imgUrl: "adfs",
    category: [
      [
        {
          name: "ICE/HOT",
          essential: false,
          options: [
            {
              idx: 1,
              name: "ICE",
              price: 1000,
            },
            {
              idx: 2,
              name: "HOT",
              price: 0,
            },
          ],
        },
        {
          name: "사이즈",
          essential: true,
          options: [
            {
              idx: 32,
              name: "작은거",
              price: 1000,
            },
            {
              idx: 34,
              name: "큰거",
              price: 1000,
            },
            {
              idx: 44,
              name: "아주 큰거",
              price: 3000,
            },
          ],
        },
      ],
    ],
  };

  let totalAmount = 0;

  const [activeToggles, setActiveToggles] = useState(
    foodOptionInfo.category[0].map(() => false)
  );
  const [selectedRadioTexts, setSelectedRadioTexts] = useState(
    foodOptionInfo.category[0].map(() => "")
  );

  const handleToggle = (index) => {
    setActiveToggles((prevToggles) => {
      const toggles = [...prevToggles];
      toggles[index] = !toggles[index];
      return toggles;
    });
  };

  const handleRadioChange = (index, text) => {
    setSelectedRadioTexts((prevTexts) => {
      const texts = [...prevTexts];
      texts[index] = text;
      return texts;
    });
  };

  return (
    <div className="order-process-page">
      <Header />

      <div className="order-process-page__menu__img">
        <img src={noImageMenu} alt="no_image_menu" />
      </div>

      <div className="order-process-page__menu__name">
        {foodOptionInfo.name}
      </div>

      <div className="order-process-page__toggle">
        {foodOptionInfo.category[0].map((category, index) => (
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
              <div className="order-process-page__toggle__body">
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
                      onChange={() => handleRadioChange(index, option.name)}
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

      <div className="order-process-page__btn">주문하기</div>
    </div>
  );
};

export default OrderProcessPage;
