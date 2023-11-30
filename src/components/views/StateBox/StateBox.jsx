import "./StateBox.css";

import cafe from "../../../assets/images/cafe_logo.png";

const StateBox = ({ id, date, name, menu, imgUrl, amount, isLast, state }) => {
  const stateList = ["진행중", "수령완료", "취소완료"];
  console.log(state);
  return (
    <>
      <div className={`order-box ${(state !== undefined && (state === 0 || state === 1 || state === 2) ) && "selected"} ${isLast && "last"}`}>
        <div className="status-bar">
          <div className="status-date">{date}</div>
          <div className={`status-box ${(state !== undefined && (state === 0 || state === 1 || state === 2) ) && "selected"}`}>
            {state !== undefined && stateList[state - 2 < 0 ? 0 : state - 2]}
          </div>
        </div>
        <div className="order-content">
          <div className="cafe-img-box">
            <img src={imgUrl} alt={cafe} />
          </div>
          <div className="cafe-box">
            <div className="cafe-name">{name}</div>
            <div className="menu-name">{menu} {amount}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StateBox;
