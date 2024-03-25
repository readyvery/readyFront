import { useNavigate } from "react-router-dom";
import UserInputNumber from "../../components/Authentication/UserInputNumber";
import { IMAGES } from "../../constants/images";
import "./AuthenticationPage.css";
const AuthenticationPage = () => {
  const navigate = useNavigate();
  return (
    <div className="authentication-page">
      <header>
        <img
          src={IMAGES.headerBack}
          alt="back"
          className="authentication-page-header_back"
          onClick={() => {
            navigate('/');
          }}
        />
      </header>
      <main className="authentication-page-container">
        <img
          src={IMAGES.find_logo}
          alt="logo"
          className="authentication-page-top-logo"
        />
        <div className="authentication-page-top-text">전화번호 인증</div>
        <UserInputNumber />
      </main>
    </div>
  );
};

export default AuthenticationPage;
