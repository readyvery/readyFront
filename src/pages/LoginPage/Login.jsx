import "./Login.css";
import { IMAGES } from "../../constants/images";
import React from "react";

function KaKaoLoginBtn() {
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_KAKAO_LOGIN}`;
  };

  return (
    <div className="login">
      <img src={IMAGES.berryTrans} alt="berry" className="login_logo_img" />

      <div className="login_logo">
        실속형 대학생활 플랫폼
        <img src={IMAGES.logo} alt="ReadyVery" />
      </div>

      <div className="login_content">
        준비는 빠르게 혜택은 다르게
        <div className="login_btn">
          <img src={IMAGES.googleLogin} alt="googleLogin" />
          <img src={IMAGES.appleLogin} alt="appleLogin" />
          <img
            src={IMAGES.kakaoLogin}
            alt="kakaoLogin"
            onClick={handleKakaoLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default KaKaoLoginBtn;
