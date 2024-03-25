import { IMAGES } from "../../../constants/images";
import "./PointStateBox.css";
const PointStateBox = ({ point, store, date }) => {
  const stateText = point > 0 ? "적립" : "사용";
  return (
    <div className={`membership-box-container
      ${point === "+0" && "nonDisplay"}
    `}>
      <div className="membership-box">
        <div
          className={`membership-box-img ${
            point > 0
              ? "membership-box-img-accumulate-color"
              : "membership-box-img-use-color"
          }`}
        >
          <img src={IMAGES.berryWhite} alt="berry" />
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
        <div className="point-box-point-span">
          {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} P
        </div>
      </div>
    </div>
  );
};

export default PointStateBox;
