import React from "react";
import Header from "../../../components/views/Header/Header";
import TEXT from "../../../constants/text";

function PrivacypolicyPage() {
  return (
    <div className="policy">
      <Header
        headerProps={{
          pageName: "개인정보 처리방침",
          linkTo: "/policy",
        }}
      />

      {TEXT.privacyPolicyTitle.split("\n").map((title, index) => (
        <React.Fragment key={index}>
          <span
            style={{
              width: "90%",
              fontSize: "14px",
              fontFamily: "Bold",
              margin: "5px auto 0 auto",
            }}
          >
            {title}
          </span>
          <br />
          {/* Check if there's a corresponding line in privacyPolicy */}
          {TEXT.privacyPolicy.split("#")[index] && (
            <div style={{ width: "90%", margin: "10px auto" }}>
              <span style={{ fontSize: "12px", fontFamily: "Regular" }}>
                {TEXT.privacyPolicy
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

export default PrivacypolicyPage;
