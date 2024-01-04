import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";
import { getAuthenticatedSelector } from "../../../Atom/status";
import profile_icon from "../../../assets/images/profile_icon.svg";
import Header from "../../../components/views/Header/Header";
import Modal from "../../../components/views/Modal/Modal";
import "./MyprofilePage.css";
import useLogout from "../../../hooks/useLogout";
import useDeleteAccount from "../../../hooks/useDeleteAccount";
import useFetchUserInfo from "../../../hooks/useFetchUserInfo";

function MyprofilePage() {
  const [, , removeCookie] = useCookies(["accessToken", "JSESSIONID"]);
  const setIsAuth = useSetRecoilState(getAuthenticatedSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [isBye, setIsBye] = useState(false);
  const userData = useFetchUserInfo();
  const logout = useLogout(removeCookie, setIsAuth);
  const deleteAccount = useDeleteAccount(removeCookie, setIsAuth);

  const byeText =
    "계정탈퇴 시, 개인정보 및 레디베리에 저장된 데이터는<br />약관에 따라 3개월 이후 삭제됩니다. 계속하겠습니까?";

  return (
    <div className="myprofile-div">
      <Header
        headerProps={{
          pageName: "나의 프로필",
          isClose: false,
          linkTo: "/mypage",
        }}
      />

      <div className="myprofile-head">
        <img
          src={profile_icon}
          alt="MyProfileIcon"
          className="myprofile-icon"
        />
      </div>

      <div className="myprofile-list">
        <div className="myprofile-text">기본정보</div>

        <div className="myprofile-detail">
          <div className="detail-box">
            <div className="detail-item-name">이름 </div>
            <div className="detail-item">{userData.name}</div>
          </div>
          <div className="detail-box">
            <div className="detail-item-name">이메일</div>
            <div className="detail-item">{userData.email}</div>
          </div>
          <div className="detail-box">
            <div className="detail-item-name">휴대폰</div>
            <div className="detail-item">{userData.phone}</div>
          </div>
        </div>

        <div className="myprofile-bye">
          <div className="myprofile-logout" onClick={() => setIsOpen(true)}>
            로그아웃
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="myprofile-unregister" onClick={() => setIsBye(true)}>
            회원탈퇴
          </div>
          {isOpen && (
            <Modal
              setIsOpen={setIsOpen}
              handleCancle={logout}
              title="로그아웃 하시겠습니까?"
              subtitle=""
            />
          )}
          {isBye && (
            <Modal
              setIsOpen={setIsBye}
              handleCancle={deleteAccount}
              title="계정탈퇴"
              subtitle={<div dangerouslySetInnerHTML={{ __html: byeText }} />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyprofilePage;
