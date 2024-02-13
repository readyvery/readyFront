import berryWhite from "../../../assets/images/ic_berry_white.png";
import "./PointStateBox.css";

const PointStateBox = ({ status, point, store, date }) => {
  const stateText = status ? "적립" : "사용";
  return (
    <div className="membership-box-container">
      <div className="membership-box">
        <div
          className={`membership-box-img ${
            status
              ? "membership-box-img-accumulate-color"
              : "membership-box-img-use-color"
          }`}
        >
          <img src={berryWhite} alt="berry" />
        </div>

        <div className="point-box-content">
          <div className="point-box-use-name">{stateText}</div>
          <div className="point-box-span">
            {stateText}일자: {date}
          </div>
          <div className="point-box-span">
            {stateText}매장: {store}
          </div>
        </div>
        <div className="point-box-point-span">{point} P</div>
      </div>
    </div>
  );
};

export default PointStateBox;
