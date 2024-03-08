import React from "react";
import { IMAGES } from "../../constants/images";
import "./Login.css";

function Login() {
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_KAKAO_LOGIN}`;
  };

  const handleAppleLogin = () => {
    window.location.href = `${process.env.REACT_APP_APPLE_LOGIN}`;
  }

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_GOOGLE_LOGIN}`
  }

  return (
    <div className="login">
      <img
        src={IMAGES.headerClose}
        alt="X"
        className="login_close"
        onClick={() => window.history.back()}
      />

      <img src={IMAGES.berryLogo} alt="ReadyVery" className="login_logo" />

      <div className="login_slogan">
        <span className="login_slogan_text">준비는 빠르게 혜택은 다르게</span>
      </div>

      {/* 카카오 로그인 */}
      <img
        src={IMAGES.kakaoLogin}
        alt="kakaoLogin"
        className="login_kakao"
        onClick={handleKakaoLogin}
      />
      {/* 애플 로그인 */}
      <img 
        src={IMAGES.appleLogin} 
        alt="appleLogin" 
        className="login_apple" 
        onClick={handleAppleLogin}
      />
      {/* 구글 로그인 */}
      <img 
        src={IMAGES.appleLogin} 
        alt="googleLogin" 
        className="login_apple" 
        onClick={handleGoogleLogin}
      />
    </div>
  );
}

export default Login;
