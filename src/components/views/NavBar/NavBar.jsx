import "./NavBar.css";
import { IMAGES } from "../../../constants/images";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <span className="navbar__btn">
        <img
          src={IMAGES.navSearch}
          alt="search"
          className="navbar__btn-img"
          onClick={() => navigate(`/search`)}
        />
        매장검색
      </span>

      <span className="navbar__btn">
        <img
          src={IMAGES.navOrderDetails}
          alt="orderDetails"
          className="navbar__btn-img"
          onClick={() => navigate(`/status`)}
        />
        주문내역
      </span>

      <span className="navbar__btn">
        <img
          src={IMAGES.navHome}
          alt="orderDetails"
          className="navbar__home"
          onClick={() => navigate(`/`)}
        />
      </span>

      <span className="navbar__btn">
        <img
          src={IMAGES.navMembership}
          alt="membership"
          className="navbar__btn-img"
          onClick={() => navigate(`/membership`)}
        />
        멤버십
      </span>

      <span className="navbar__btn">
        <img
          src={IMAGES.navMypage}
          alt="mypage"
          className="navbar__btn-img"
          onClick={() => navigate(`/mypage`)}
        />
        마이페이지
      </span>
    </div>
  );
};

export default NavBar;
