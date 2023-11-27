import React from "react";
import Header from "../../components/views/Header/Header";
import TEXT from "../../constants/text";

function PolicyInLogin() {
  return (
    <div className="policylogin-div" style={{ width: "90%" }}>
      <Header
        headerProps={{
          pageName: "레디베리 이용약관",
          isClose: false,
          linkTo: "/kakaologin",
        }}
      />
      <div style={{ fontSize: "13px" }}>
        {TEXT.termsofuse.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PolicyInLogin;
