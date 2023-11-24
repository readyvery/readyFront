import React from "react";
import Header from "../../../components/views/Header/Header";
import TEXT from "../../../constants/text";

function ThirdpartyPage() {
  return (
    <div className="privacy-div" style={{ width: "90%", height: "94vh" }}>
      <Header
        headerProps={{
          pageName: "개인정보 제3자 제공 동의",
          isClose: false,
          linkTo: "/policy",
        }}
      />
      <div style={{ fontSize: "13px" }}>
        {TEXT.thirdParty.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ThirdpartyPage;
