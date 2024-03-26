import React from "react";
import { IMAGES } from "../../../constants/images";
import "./Loading.css";

const SpinLodingBar = () => {
  return (
    <div className="spinLodingBar-container">
      <div className="loading-loader" />
      <div className="loading-berry">
        <img src={IMAGES.berry} alt="berry" />
      </div>
    </div>
  );
};
// 로딩창
const Loading = ({ styleBackground }) => {
  const Background = styleBackground || "none"; //기본값 흰색
  return (
    <div className="loading-div" style={{ background: Background }}>
      <SpinLodingBar />
    </div>
  );
};

export default Loading;
