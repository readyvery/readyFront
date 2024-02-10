import React from "react";
// import { useRecoilState } from "recoil";
// import { isAuthenticatedState } from "../../Atom/status";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import { IMAGES } from "../../constants/images";
// import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import "./MembershipPage.css";

function MembershipPage() {
  // const [isAuth] = useRecoilState(isAuthenticatedState);
  // const { name: userName } = useFetchUserInfo();

  return (
    <div className="membershippage-div">
      <Header
        headerProps={{
          pageName: "멤버십",
          isClose: false,
          linkTo: "/",
        }}
      />
      <div className="membershippage-point-box-wrapper">
        <div className="membershippage-point-box-top-wrapper">
          <div className="membershippage-point-box-top-img-wrapper">
            <img src={IMAGES.logoWhite} alt="logoWhite" />
          </div>
          <div>P</div>
        </div>
        dk
      </div>
      dldd
      <NavBar />
    </div>
  );
}

export default MembershipPage;
