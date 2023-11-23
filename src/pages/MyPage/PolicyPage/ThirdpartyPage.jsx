import React from "react";
import Header from "../../../components/views/Header/Header";

function ThirdpartyPage() {
  return (
    <div className="privacy-div">
      <Header
        headerProps={{
          pageName: "개인정보 제3자 제공 동의",
          isClose: false,
          linkTo: "/policy",
        }}
      />
    </div>
  );
}

export default ThirdpartyPage;
