import "./Login.css";
import { IMAGES } from "../../constants/images";
import React from "react";

function Login() {
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_KAKAO_LOGIN}`;
  };

  return (
    <div className="login">
      <img
        src={IMAGES.headerClose}
        alt="X"
        className="login_close"
        onClick={() => window.history.back()}
      />

      <img src={IMAGES.berryLogo} alt="ReadyVery" className="login_logo" />

      {/* <div className="login_slogan">
        <span className="login_slogan_text">준비는 빠르게 혜택은 다르게</span>
      </div>

      <img
        src={IMAGES.kakaoLogin}
        alt="kakaoLogin"
        className="login_kakao"
        onClick={handleKakaoLogin}
      />
      <img src={IMAGES.appleLogin} alt="appleLogin" className="login_apple" /> */}

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

export default Login;
