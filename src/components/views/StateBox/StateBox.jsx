import "./StateBox.css";

import cafe from "../../../assets/images/cafe_logo.png";

const StateBox = ({ id, date, name, menu, imgUrl, amount, isLast, state = 1 }) => {
  const stateList = ["취소완료", "진행중", "수령완료"];

  return (
    <>
      <div className={`order-box ${state === 1 && "selected"} ${isLast && "last"}`}>
        <div className="status-bar">
          <div className="status-date">{date}</div>
          <div className={`status-box ${state === 1 && "selected"}`}>
            {stateList.filter((e, i) => i === state)}
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
