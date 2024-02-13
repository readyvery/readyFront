import React from "react";
// import { useRecoilState } from "recoil";
// import { isAuthenticatedState } from "../../Atom/status";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import { IMAGES } from "../../constants/images";
// import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import PointStateBox from "../../components/views/PointStateBox/PointStateBox";
import "./MembershipPage.css";

function MembershipPage() {
  // const [isAuth] = useRecoilState(isAuthenticatedState);
  // const { name: userName } = useFetchUserInfo();
  const point = 10000;
  return (
    <section className="membershippage-div">
      <Header
        headerProps={{
          pageName: "멤버십",
          isClose: false,
          linkTo: "/",
        }}
      />
      <main className="membershippage-point-box-container">
        {/* 멤버쉽 박스 */}
        <div className="membershippage-point-box-wrapper">
          {/* 맵버쉽 박스 윗부분_로고&포인트 */}
          <div className="membershippage-point-box-top-wrapper">
            <div className="membershippage-point-box-top-img-wrapper">
              <img src={IMAGES.logoWhite} alt="logoWhite" />
            </div>
            <div>{point} P</div>
          </div>
          {/* 멤버쉽 박스 아랫부분_쿠폰함&FAQ */}
          <div className="membershippage-point-box-bottom-wrapper">
            <ul>
              <li>쿠폰함</li>
              <li style={{ margin: "0 3.47rem" }}>|</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
        {/* 포인트 사용 내역 */}
        <div className="membershippage-use-point-box-wrapper">
          <div className="membershippage-use-point-box-title">
            <span>포인트 사용내역</span>
          </div>
          {/* {newStorageList?.length ? (
            newStorageList?.map((e, i) => (
              <div
                onClick={(event) =>
                  handleNavigation(event, e.orderId, e.progress)
                }
                style={{ textDecoration: "none" }}
              > */}
          {/* 매핑될 요소 */}
          <div className="membershippage-use-point-box-content">
            <PointStateBox
              status={true}
              point={"+1000"}
              store={"오르다"}
              date="2023-11-25 19:09"
            />
          </div>
          <div className="membershippage-use-point-box-content">
            <PointStateBox
              status={true}
              point={"+2000"}
              store={"오르다"}
              date="2023-11-25 19:09"
            />
          </div>
          <div className="membershippage-use-point-box-content">
            <PointStateBox
              status={true}
              point={"+3000"}
              store={"오르다"}
              date="2023-11-25 19:09"
            />
          </div>
          <div className="membershippage-use-point-box-content">
            <PointStateBox
              status={true}
              point={"+4000"}
              store={"오르다"}
              date="2023-11-25 19:09"
            />
          </div>
          <div className="membershippage-use-point-box-content">
            <PointStateBox
              status={true}
              point={"+5000"}
              store={"오르다"}
              date="2023-11-25 19:09"
            />
          </div>

          {/* </div>
            ))
          ) : (
            <div className="empty-order-wrapper">
              <img src={IMAGES.empty} className="empty-img" alt="empty" />
              <span className="empty-text">비어있습니다</span>
            </div>
          )} */}
        </div>
      </main>

      <NavBar />
    </section>
  );
}

export default MembershipPage;
