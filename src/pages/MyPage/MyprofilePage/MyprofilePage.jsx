import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";
import { getAuthenticatedSelector } from "../../../Atom/status";
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
  const { email, name, phone } = useFetchUserInfo();
  const logout = useLogout(removeCookie, setIsAuth);
  const deleteAccount = useDeleteAccount(removeCookie, setIsAuth);

  const byeText =
    "계정탈퇴 시, 개인정보 및 레디베리에 저장된 데이터는<br />약관에 따라 3개월 이후 삭제됩니다. 계속하겠습니까?";

  return (
    <div className="myprofile">
      <Header
        headerProps={{
          pageName: "계정 관리",
          linkTo: "/mypage",
        }}
      />

      <div className="myprofile_management">
        <div className="myprofile_info">기본 정보</div>

        <div className="myprofile_info_title">
          이름
          <div className="myprofile_info_content">{name}</div>
        </div>
        <div className="myprofile_info_title">
          이메일
          <div className="myprofile_info_content">{email}</div>
        </div>
        <div className="myprofile_info_title">
          휴대폰
          <div className="myprofile_info_content">{phone}</div>
        </div>
        <div className="myprofile_info_title">
          연동된 소셜 계정
          <div className="myprofile_info_content">카카오</div>
        </div>

        <div className="myprofile_setting">
          <span onClick={() => setIsOpen(true)}>로그아웃</span>
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <span onClick={() => setIsBye(true)}>회원탈퇴</span>
        </div>
      </div>

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
    </div>
  );
}

export default MyprofilePage;
