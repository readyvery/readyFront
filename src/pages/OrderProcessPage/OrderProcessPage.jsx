import "./style.css";
import React, { useState } from "react";
import Header from "../../components/views/Header/Header";
import noImageMenu from "../../assets/images/no_image_menu.svg";

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

  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div>
      <Header />
      <div className="order-process-page__menu__img">
        <img src={noImageMenu} alt="no_image_menu" />
      </div>

      <div className="order-process-page__menu__name">
        {foodOptionInfo.name}
      </div>
    </div>
  );
};
export default OrderProcessPage;
