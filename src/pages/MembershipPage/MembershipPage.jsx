import React from "react";
// import { useRecoilState } from "recoil";
// import { isAuthenticatedState } from "../../Atom/status";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import { IMAGES } from "../../constants/images";
// import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import { useNavigate } from "react-router-dom";
import PointStateBox from "../../components/views/PointStateBox/PointStateBox";
import "./MembershipPage.css";
import Empty from "../../components/views/PageComponent/Empty";

function MembershipPage() {
  // const [isAuth] = useRecoilState(isAuthenticatedState);
  // const { name: userName } = useFetchUserInfo();
  const navigate = useNavigate();
  const point = 10000;
  const membershipList = [
    // {
    //   status: true,
    //   point: "+1000",
    //   store: "오르다",
    //   date: "2023-11-25 19:09",
    // },
    // {
    //   status: false,
    //   point: "-1000",
    //   store: "오르다",
    //   date: "2023-11-25 19:09",
    // },
  ];

  return (
    <section className="membershippage-div">
      <Header
        headerProps={{
          pageName: "멤버십",
          // linkTo: "/",
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
            <div>
              {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} P
            </div>
          </div>
          {/* 멤버쉽 박스 아랫부분_쿠폰함&FAQ */}
          <div className="membershippage-point-box-bottom-wrapper">
            <ul>
              <li onClick={() => navigate(`/coupon`)}>쿠폰함</li>
              <li style={{ margin: "0 3.47rem" }}>|</li>
              <li onClick={() => navigate(`/faq`)}>FAQ</li>
            </ul>
          </div>
        </div>
        {/* 포인트 사용 내역 */}
        <div className="membershippage-use-point-box-wrapper">
          <div className="membershippage-use-point-box-title">
            <span>멤버십 내역</span>
          </div>
          {membershipList?.length ? (
            membershipList?.map((e, i) => (
              // {/* 매핑될 요소 */}
              <div
                className="membershippage-use-point-box-content"
                // onClick={(event) =>
                //   handleNavigation(event, e.orderId, e.progress)
                // }
                style={{ textDecoration: "none" }}
                key={i}
              >
                <PointStateBox
                  status={e.status}
                  point={e.point}
                  store={e.store}
                  date={e.date}
                />
              </div>
            ))
          ) : (
            <div className="membershippage-empty-order-wrapper">
              <Empty />
            </div>
          )}
        </div>
      </main>

      <NavBar />
    </section>
  );
}

export default MembershipPage;
