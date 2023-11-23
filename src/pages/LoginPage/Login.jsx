import React from "react";
import styled from "styled-components";
import Kakaologo from "../../assets/images/kakao_logo.svg";
import loginpagelogo from "../../assets/images/login_logo.svg";

const Container = styled.div`
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img`
  margin: 40% 0 40% 0;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const KakaoButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  margin-bottom: 80px;
`;

function KaKaoLoginBtn() {
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_KAKAO_LOGIN}`;
  };

  return (
    <Container>
      <LogoContainer>
        <LogoImage src={loginpagelogo} alt="로고" />
      </LogoContainer>
      <LoginContainer>
        <KakaoButton onClick={handleKakaoLogin}>
          <img src={Kakaologo} alt="카카오로그인" />
        </KakaoButton>
      </LoginContainer>
    </Container>
  );
}

export default KaKaoLoginBtn;
