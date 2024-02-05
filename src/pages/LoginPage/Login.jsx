import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMAGES } from "../../constants/images";
import Header from "../../components/views/Header/Header";

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
  margin: 35% 0 10% 0;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-top: 1.5rem;
  font-size: 0.8rem;
  font-family: "Pretendard Variable";
  font-weight: 400;
`;

function KaKaoLoginBtn() {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_KAKAO_LOGIN}`;
  };
  const handlePolicyClick = () => {
    navigate("/policyinlogin"); // 페이지 이동 추가
  };
  const handlePrivacyClick = () => {
    navigate("/privacypolicyinlogin");
  };
  return (
    <div className="login-div">
      <Header
        headerProps={{
          pageName: "",
          isClose: true,
          linkTo: "/",
        }}
      />

      <Container>
        <LogoContainer>
          {/* <LogoImage src={loginpagelogo} alt="로고" /> */}
        </LogoContainer>
        <LoginContainer>
          <KakaoButton onClick={handleKakaoLogin}>
            <img src={IMAGES.kakaoLogin} alt="카카오로그인" />
          </KakaoButton>
        </LoginContainer>
        <PolicyContainter onClick={handlePolicyClick}>
          <div style={{ borderBottom: "0.5px solid #000" }}>
            레디베리 이용약관
          </div>
        </PolicyContainter>
        <PolicyContainter onClick={handlePrivacyClick}>
          <div style={{ borderBottom: "0.5px solid #000" }}>
            레디베리 개인정보 처리방침
          </div>
        </PolicyContainter>
      </Container>
    </div>
  );
}

export default KaKaoLoginBtn;
