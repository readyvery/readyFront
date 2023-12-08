import "./StateBox.css";

import { Link } from "react-router-dom";
import cafe from "../../../assets/images/cafe_logo.png";

const StateBox = ({ id, date, name, menu, imgUrl, amount, isLast, state }) => {
  const stateList = ["진행중", "수령완료", "취소완료", "결제실패"];
  return (
    <>
      <div
        className={`order-box ${
          state !== undefined &&
          (state === 0 || state === 1 || state === 2) &&
          "selected"
        } ${isLast && "last"}`}
      >
        <div className="status-bar">
          <div className="status-date">{date}</div>
          <div
            className={`status-box ${
              state !== undefined &&
              (state === 0 || state === 1 || state === 2) &&
              "selected"
            }`}
          >
            {id !== "" ? (
              <Link
                to={`/orderDetail?orderId=${id}`}
                state={{ returnTo: "/ready" }}
                style={{ textDecoration: "none", color: "#000" }}
              >
                상세보기
              </Link>
            ) : (
              state !== undefined && (
                <div>{stateList[state - 2 < 0 ? 0 : state - 2]}</div>
              )
            )}
          </div>
        </div>
        <div className="order-content">
          <div className="cafe-img-box">
            <img src={imgUrl} alt={cafe} style={{ width: 80, height: 80 }} />
          </div>
          <div className="cafe-box">
            <div className="cafe-name">{name}</div>
            <div className="menu-name">{menu}</div>
            <div className="menu-name">
              {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StateBox;
