import React from "react";
import Header from "../../../components/views/Header/Header";
import TEXT from "../../../constants/text";

function PositionpolicyPage() {
  return (
    <div className="privacy-div" style={{ width: "90%" }}>
      <Header
        headerProps={{
          pageName: "위치 기반 서비스 이용약관",
          isClose: false,
          linkTo: "/policy",
        }}
      />
      <div style={{ fontSize: "13px" }}>
        {TEXT.positionPolicy.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PositionpolicyPage;
