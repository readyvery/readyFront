import React from "react";
import Header from "../../../components/views/Header/Header";
import TEXT from "../../../constants/text";

function PrivacypolicyPage() {
  return (
    <div className="privacy-div" style={{ width: "90%" }}>
      <Header
        headerProps={{
          pageName: "개인정보 처리방침",
          isClose: false,
          linkTo: "/policy",
        }}
      />
      <div style={{ fontSize: "13px" }}>
        {TEXT.privacyPolicy.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PrivacypolicyPage;
