import React from "react";
import Header from "../../components/views/Header/Header";
import TEXT from "../../constants/text";

function PrivacypolicyLogin() {
  return (
    <div className="privacy-div" style={{ width: "90%" }}>
      <Header
        headerProps={{
          pageName: "개인정보 처리방침",
          isClose: false,
          linkTo: "/kakaologin",
        }}
      />
      
      {TEXT.privacyPolicyTitle.split("\n").map((title, index) => (
        <React.Fragment key={index}>
          <span style={{'fontSize' : '14px', 'fontFamily': "Bold", 'marginTop' : '5px'}}>{title}</span>
          <br />
          {/* Check if there's a corresponding line in privacyPolicy */}
          {TEXT.privacyPolicy.split("#")[index] && (
            <div style={{'marginTop': '10px', 'marginBottom': '10px'}}>
            <span style={{'fontSize': '12px', 'fontFamily': "Regular"}}>
              {TEXT.privacyPolicy.split("#")[index].split("\n").map((e) => (
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

export default PrivacypolicyLogin;
