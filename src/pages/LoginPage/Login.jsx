import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../constants/images";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_GOOGLE_LOGIN}`;
  };
  const handleAppleLogin = () => {
    window.location.href = `${process.env.REACT_APP_APPLE_LOGIN}`;
  };
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_KAKAO_LOGIN}`;
  };

  return (
    <div className="login">
      <img
        src={IMAGES.headerClose}
        alt="X"
        className="login_close"
        onClick={() => navigate('/')}
      />

      <img src={IMAGES.berryLogo} alt="ReadyVery" className="login_logo" />

      {/* <div className="login_slogan">
        <span className="login_slogan_text">준비는 빠르게 혜택은 다르게</span>
      </div> */}

      <div className="login_content">
        준비는 빠르게 혜택은 다르게
        <div className="login_btn">
          <img
            src={IMAGES.googleLogin}
            alt="googleLogin"
            onClick={handleGoogleLogin}
          />
          <img
            src={IMAGES.appleLogin}
            alt="appleLogin"
            onClick={handleAppleLogin}
          />
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
