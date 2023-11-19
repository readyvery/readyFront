import "./StateBox.css";

import cafe from "../../../assets/images/cafe_logo.png";

const StateBox = ({ id, date, name, menu, state }) => {
  const stateList = ["취소완료", "진행중", "수령완료"];

  return (
    <>
      <div className={`order-box ${state === 1 && "selected"}`}>
        <div className="status-bar">
          <div className="status-date">{date}</div>
          <div className={`status-box ${state === 1 && "selected"}`}>
            {stateList.filter((e, i) => i === state)}
          </div>
        </div>
        <div className="order-content">
          <div className="cafe-img-box">
            <img src={cafe} alt={cafe} />
          </div>
          <div className="cafe-box">
            <div className="cafe-name">{name}</div>
            <div className="menu-name">{menu}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StateBox;
