import "./StateBox.css";

import { Link } from "react-router-dom";

const StateBox = ({ id, date, name, menu, imgUrl, amount, isLast, state }) => {
  const stateList = ["진행중", "제조완료", "수령완료", "취소완료", "결제실패"];
  return (
    <>
      <div
        className={`order-box ${
          state !== undefined &&
          (state === 0 || state === 1) &&
          "selected"
        } ${isLast && "last"}`}
      >
        <div className="status-bar">
          <div className="status-date">{date}</div>
          <div
            className={`status-box ${
              state !== undefined &&
              (state === 0 || state === 1) &&
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
                <div>{stateList[state - 1 < 0 ? 0 : state - 1]}</div>
              )
            )}
          </div>
        </div>
        <div className="order-content">
          <div className="cafe-img-box">
            <img
              src={imgUrl}
              alt="cafe-img"
              style={{ width: 80, height: 80, background: "#DADADA" }}
            />
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
