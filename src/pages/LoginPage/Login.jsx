import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Kakaologo from "../../assets/images/kakao_logo.svg";
import loginpagelogo from "../../assets/images/login_logo.svg";

const Container = styled.div`
  width: 100%;
  height: 94vh;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img`
  margin: 20% 0 40% 0;
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
`;

const PolicyContainter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  font-size: 0.8rem;
  font-family: "Regular";
`;

function KaKaoLoginBtn() {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_KAKAO_LOGIN}`;
  };
  const handlePolicyClick = () => {
    navigate("/policyinlogin"); // 페이지 이동 추가
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
      <PolicyContainter onClick={handlePolicyClick}>
        레디베리이용약관
      </PolicyContainter>
    </Container>
  );
}

export default KaKaoLoginBtn;
