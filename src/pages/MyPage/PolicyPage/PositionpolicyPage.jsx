import React from "react";
import Header from "../../../components/views/Header/Header";
import TEXT from "../../../constants/text";

function PositionpolicyPage() {
  return (
    <div className="privacy">
      <Header
        headerProps={{
          pageName: "위치 기반 서비스 이용약관",
          linkTo: "/policy",
        }}
      />

      {TEXT.positionPolicyTitle.split("\n").map((title, index) => (
        <React.Fragment key={index}>
          <span
            style={{ fontSize: "14px", fontFamily: "Bold", marginTop: "5px" }}
          >
            {title}
          </span>
          <br />
          {/* Check if there's a corresponding line in privacyPolicy */}
          {TEXT.positionPolicy.split("#")[index] && (
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", fontFamily: "Regular" }}>
                {TEXT.positionPolicy
                  .split("#")
                  [index].split("\n")
                  .map((e) => (
                    <div>{e}</div>
                  ))}
              </span>
              <div></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default PositionpolicyPage;
