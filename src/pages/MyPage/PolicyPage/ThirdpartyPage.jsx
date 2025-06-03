import React from "react";
import Header from "../../../components/views/Header/Header";
import TEXT from "../../../constants/text";

function ThirdpartyPage() {
  return (
    <div className="privacy-div" style={{ width: "90%", height: "94vh" }}>
      <Header
        headerProps={{
          pageName: "개인정보 제3자 제공 동의",
          // linkTo: "/policy",
        }}
      />
      <div style={{ fontSize: "12px", fontFamily: "Regular" }}>
        {TEXT.thirdPartyTitle.split("\n")?.map((title, index) => (
          <React.Fragment key={index}>
            <span
              style={{ fontSize: "14px", fontFamily: "Bold", marginTop: "5px" }}
            >
              {title}
            </span>
            <br />
            {/* Check if there's a corresponding line in privacyPolicy */}
            {TEXT.thirdParty.split("#")[index] && (
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <span style={{ fontSize: "12px", fontFamily: "Regular" }}>
                  {TEXT.thirdParty
                    .split("#")
                    [index].split("\n")
                    ?.map((e) => (
                      <div>{e}</div>
                    ))}
                </span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ThirdpartyPage;
