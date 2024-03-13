import { useEffect, useState } from "react";
import Container from "../../components/Authentication/Container";
import UserInputNumber from "../../components/Authentication/UserInputNumber";

const AuthenticationPage = () => {
    const [is480, setIs480] = useState(window.innerWidth <= 480);
    const containerSize = is480
    ? ["25rem", "37.5rem", "2.56rem", "2.31rem"]
    : ["37.5rem", "50rem", "5.63rem", "3.88rem"];

  useEffect(() => {
    const handleResize = () => {
      setIs480(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Container
      title="전화번호 인증"
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <div className="signup-page-content-phone-container">
        <UserInputNumber />
      </div>
    </Container>
  );
};

export default AuthenticationPage;