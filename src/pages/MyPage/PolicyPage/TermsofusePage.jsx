import React from "react";
import Header from "../../../components/views/Header/Header";

function TermsofusePage() {
  return (
    <div className="privacy-div">
      <Header
        headerProps={{
          pageName: "서비스 이용약관",
          isClose: false,
          linkTo: "/policy",
        }}
      />
    </div>
  );
}

export default TermsofusePage;
