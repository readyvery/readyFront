import "./NavBar.css";
import { IMAGES } from "../../../constants/images";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <span className="navbar__btn" onClick={() => navigate(`/search`)}>
        <img src={IMAGES.navSearch} alt="search" className="navbar__btn-img" />
        매장검색
      </span>

      <span className="navbar__btn" onClick={() => navigate(`/status`)}>
        <img
          src={IMAGES.navOrderDetails}
          alt="orderDetails"
          className="navbar__btn-img"
        />
        주문내역
      </span>

      <span className="navbar__btn" onClick={() => navigate(`/`)}>
        <img src={IMAGES.navHome} alt="orderDetails" className="navbar__home" />
      </span>

      <span className="navbar__btn" onClick={() => navigate(`/membership`)}>
        <img
          src={IMAGES.navMembership}
          alt="membership"
          className="navbar__btn-img"
        />
        멤버십
      </span>

      <span className="navbar__btn" onClick={() => navigate(`/mypage`)}>
        <img src={IMAGES.navMypage} alt="mypage" className="navbar__btn-img" />
        마이페이지
      </span>
    </div>
  );
};

export default NavBar;
