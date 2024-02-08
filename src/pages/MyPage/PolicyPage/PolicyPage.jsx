import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/views/Header/Header";
import "./PolicyPage.css";

function PolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="policy" style={{ height: "94vh" }}>
      <Header
        headerProps={{
          pageName: "약관 및 정책",
          isClose: false,
          linkTo: "/mypage",
        }}
      />

      <div className="policy_list">
        <div
          onClick={() => navigate(`/termsofuse`)}
          className="policy_list_item"
        >
          서비스 이용약관
        </div>
        <div
          onClick={() => navigate(`/privacypolicy`)}
          className="policy_list_item"
        >
          개인정보 처리방침
        </div>
        {/* <div
          onClick={() => navigate(`/thirdparty`)}
          alt="개인정보 제3자 제공 동의"
          className="personal-3rd"
        >
          개인정보 제3자 제공 동의
        </div>
        <div
          onClick={() => navigate(`/position`)}
          alt="위치 기반 서비스 이용약관"
          className="position"
        >
          위치 기반 서비스 이용약관
        </div> */}
      </div>
    </div>
  );
}

export default PolicyPage;
