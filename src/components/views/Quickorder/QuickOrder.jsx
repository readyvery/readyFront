import React from "react";
import { Link } from "react-router-dom";
import profile_icon from "../../../assets/images/profile_icon.png";
import useFetchQuickOrder from "../../../hooks/useFetchQuickOrder";

const QuickOrderComponent = ({ isAuth }) => {
  const quickOrder = useFetchQuickOrder(isAuth);

  return (
    <>
      <div className="quick-order-list">
        {isAuth ? (
          quickOrder.length > 0 ? (
            quickOrder.map((item) => (
              <Link
                to={`/payment?storeId=${item.storeId}&inout=${item.inOut}&cartId=${item.cartId}`}
                className="login-box"
                key={item.id}
              >
                <div className="quick-order-item">
                  <div className="item-name">{item.name}</div>
                  <div className="item-detail">{item.orderName}</div>
                  <div className="item-price">{item.amount}원</div>
                </div>
              </Link>
            ))
          ) : (
            <Link to={`/search`} className="not-login-box">
              <img
                src={profile_icon}
                alt="ProfileIcon"
                className="profile-icon"
                style={{ width: 60, height: 60 }}
              />
              <div className="not-loggedIn">첫 주문 후 이용가능합니다</div>
            </Link>
          )
        ) : (
          <Link to="/kakaologin" className="not-login-box">
            <img
              src={profile_icon}
              alt="ProfileIcon"
              className="profile-icon"
              style={{ width: 60, height: 60 }}
            />
            <div className="not-loggedIn">로그인하고 시작하기</div>
          </Link>
        )}
      </div>
    </>
  );
};

export default QuickOrderComponent;
