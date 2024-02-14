import React from "react";
import Header from "../../../components/views/Header/Header";
import TEXT from "../../../constants/text";

function TermsofusePage() {
  return (
    <div className="policy" style={{ width: "90%" }}>
      <Header
        headerProps={{
          pageName: "서비스 이용약관",
          linkTo: "/policy",
        }}
      />
      {TEXT.tuermsoTitle.split("\n").map((title, index) => (
        <React.Fragment key={index}>
          <span
            style={{ fontSize: "14px", fontFamily: "Bold", marginTop: "5px" }}
          >
            {title}
          </span>
          <br />
          {/* Check if there's a corresponding line in privacyPolicy */}
          {TEXT.termsofuse.split("#")[index] && (
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", fontFamily: "Regular" }}>
                {TEXT.termsofuse
                  .split("#")
                  [index].split("\n")
                  .map((e) => (
                    <div>{e}</div>
                  ))}
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default TermsofusePage;
