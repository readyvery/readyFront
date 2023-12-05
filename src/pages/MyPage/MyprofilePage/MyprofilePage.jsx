import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getAuthenticatedSelector } from "../../../Atom/status";
import profile_icon from "../../../assets/images/profile_icon.svg";
import Header from "../../../components/views/Header/Header";
import Modal from "../../../components/views/Modal/Modal";
import "./MyprofilePage.css";

function MyprofilePage() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const [, , removeCookie] = useCookies(["accessToken", "JSESSIONID"]);
  const setIsAuth = useSetRecoilState(getAuthenticatedSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [isBye, setIsBye] = useState(false);

  const byeText =
    "계정탈퇴 시, 개인정보 및 레디베리에 저장된 데이터는<br />약관에 따라 3개월 이후 삭제됩니다. 계속하겠습니까?";

  const handleLogout = async () => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.get(apiUrl + "/api/v1/user/logout", config);
      console.log(response);
      removeCookie("accessToken", { domain: process.env.REACT_APP_DOMAIN });
      removeCookie("JSESSIONID", { domain: process.env.REACT_APP_DOMAIN });
      setIsAuth(false);
      message.success("로그아웃에 성공하셨습니다.");
      navigate("/");
    } catch (error) {
      alert("관리자에게 문의하세요.");
      navigate("/");
    }
  };

  const handleLogdelete = async () => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.get(apiUrl + "/api/v1/user/remove", config);
      console.log(response);
      removeCookie("accessToken", { domain: process.env.REACT_APP_DOMAIN });
      removeCookie("JSESSIONID", { domain: process.env.REACT_APP_DOMAIN });
      setIsAuth(false);
      message.success("회원탈퇴에 성공하셨습니다.");
      navigate("/");
    } catch (error) {
      alert("관리자에게 문의하세요.");
      navigate("/");
    }
  };

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const config = {
      withCredentials: true,
    };

    axios
      .get(`${apiUrl}/api/v1/user/info`, config)
      .then((response) => {
        const { name, phone, email } = response.data;
        setUserData({ name, phone, email });
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        // Handle error, e.g., redirect to login page
      });
  }, [apiUrl]);

  // const dummyUserItems = {
  //   name: "바나나",
  //   phone: "010-1234-5678",
  //   email: "1223v@naver.com",
  // };

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
              handleCancle={handleLogout}
              title="로그아웃 하시겠습니까?"
              subtitle=""
            />
          )}
          {isBye && (
            <Modal
              setIsOpen={setIsBye}
              handleCancle={handleLogdelete}
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
