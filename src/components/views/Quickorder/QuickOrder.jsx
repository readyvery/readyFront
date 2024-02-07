import "./QuickOrder.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchQuickOrder from "../../../hooks/useFetchQuickOrder";
import { IMAGES } from "../../../constants/images";

const QuickOrderComponent = ({ isAuth }) => {
  const quickOrder = useFetchQuickOrder(isAuth);
  const navigate = useNavigate();

  return (
    <div className="quick_order">
      <div className="quick_order_title">
        바로 주문
        <img
          src={IMAGES.quickOrderGuide}
          alt="guide"
          className="quick_order_guide"
        />
      </div>

      {quickOrder.length > 0 ? (
        quickOrder.map((item) => (
          <div
            className="quick_order_list"
            key={item.id}
            onClick={() =>
              navigate(
                `/payment?storeId=${item.storeId}&inout=${item.inOut}&cartId=${item.cartId}`
              )
            }
          >
            <div className="quick_order_item">
              <div className="quick_order_item_name">{item.name}</div>
              <div className="quick_order_item_name_detail">
                {item.orderName}
              </div>
              <div className="quick_order_item_name_price">{item.amount}원</div>
            </div>
          </div>
        ))
      ) : (
        <div className="quick_order_none" onClick={() => navigate(`/search`)}>
          첫 주문 후 이용 가능합니다!
        </div>
      )}
    </div>
  );
};

export default QuickOrderComponent;
