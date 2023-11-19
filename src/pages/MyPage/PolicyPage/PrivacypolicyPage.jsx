import React from "react";
import Header from "../../../components/views/Header/Header";

function PrivacypolicyPage() {
  return (
    <div className="privacy-div">
      <Header
        headerProps={{
          pageName: "개인정보 처리방침",
          isClose: false,
          linkTo: "/policy",
        }}
      />
    </div>
  );
}

export default PrivacypolicyPage;
