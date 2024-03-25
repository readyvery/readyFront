import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getAuthenticatedSelector, isAuthenticatedState } from "../../Atom/status";
import Header from "../../components/views/Header/Header";
import Modal from "../../components/views/Modal/Modal";
import NavBar from "../../components/views/NavBar/NavBar";
import { IMAGES } from "../../constants/images";
import useDeleteAccount from "../../hooks/useDeleteAccount";
import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import useGetPoint from "../../hooks/useGetPoint";
import useLogout from "../../hooks/useLogout";
import "./MyPage.css";

function Mypage() {
  const navigate = useNavigate();
  // const token = localStorage.getItem("accessToken");
  const isAuth = useRecoilValue(isAuthenticatedState);
  const { name: userName } = useFetchUserInfo();
  const point = useGetPoint();
  const [, , removeCookie] = useCookies(["accessToken", "JSESSIONID"]);
  const setIsAuth = useSetRecoilState(getAuthenticatedSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [isBye, setIsBye] = useState(false);
  const logout = useLogout(removeCookie, setIsAuth);
  const deleteAccount = useDeleteAccount(removeCookie, setIsAuth);
  const byeText =
    "계정탈퇴 시, 개인정보 및 레디베리에 저장된 데이터는<br />약관에 따라 3개월 이후 삭제됩니다. 계속하겠습니까?";

  return (
    <div className="mypage">
      <Header
        headerProps={{
          pageName: "마이페이지",
          linkTo: "/",
        }}
      />

      {isAuth ? (
        <div>
          <div
            className="mypage_profile"
            onClick={() => navigate(`/myprofile`)}
          >
            <img
              src={IMAGES.profile}
              alt="profile img"
              className="mypage_profile_img"
            />
            <span className="mypage_profile_name">{userName}</span>
            <span className="mypage_profile_management">계정 관리</span>
          </div>
          <div
            className="mypage_profile_point"
            onClick={() => navigate(`/membership`)}
          >
            <img src={IMAGES.logoWhite} alt="ReadyVery" />
            {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} P
          </div>
        </div>
      ) : (
        <div className="mypage_profile" onClick={() => navigate(`/login`)}>
          <img
            src={IMAGES.profile}
            alt="profile img"
            className="mypage_profile_img"
          />
          <span className="mypage_profile_name">로그인하고 시작하기</span>
        </div>
      )}

      <div className="mypage_profile_category_title">
        주문 및 결제
        <div
          className="mypage_profile_category"
          onClick={() => navigate(isAuth ? `/coupon` : `/login`)}
        >
          쿠폰함
        </div>
        <div
          className="mypage_profile_category"
          onClick={() => navigate(isAuth ? `/status` : `/login`)}
        >
          주문 내역
        </div>
        <div
          className="mypage_profile_category"
          onClick={() => navigate(isAuth ? `/membership` : `/login`)}
        >
          멤버십 내역
        </div>
      </div>

      <div className="mypage_profile_line"></div>

      <div className="mypage_profile_category_title">
        문의 및 알림
        <div
          className="mypage_profile_category"
          onClick={() => navigate(`/eventing`)}
        >
          진행 중인 이벤트
        </div>
        <div
          className="mypage_profile_category"
          onClick={() => navigate(`/policy`)}
        >
          약관 및 정책
        </div>
        <div
          className="mypage_profile_category"
          onClick={() => navigate(`/customerservice`)}
        >
          고객센터
        </div>
        {/* <div className="mypage_profile_category">레디베리 리서치 참여</div> */}
      </div>

      {isAuth && (
        <div className="mypage_profile_category_manage">
          계정관리
          <div
            className="mypage_profile_category"
            onClick={() => setIsOpen(true)}
          >
            로그아웃
          </div>
          <div 
            className="mypage_profile_category" 
            onClick={() => setIsBye(true)}
          >
            계정탈퇴
          </div>
        </div>
      )}

      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          handleCancel={logout}
          title="로그아웃 하시겠습니까?"
          subtitle=""
        />
      )}
      {isBye && (
        <Modal
          setIsOpen={setIsBye}
          handleCancel={deleteAccount}
          title="계정탈퇴"
          subtitle={<div dangerouslySetInnerHTML={{ __html: byeText }} />}
        />
      )}

      <NavBar />
    </div>
  );
}

export default Mypage;
