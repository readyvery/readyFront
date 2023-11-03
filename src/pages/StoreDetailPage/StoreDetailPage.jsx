import caffeeBanner from "../../assets/images/caffee_banner.svg";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import "./style.css";

const StoreDetailPage = () => {
  return (
    <div className="store-detail-page">
      <Header />
      <div className="store-detail-page__banner">
        <img
          className="store-detail-page__bannerImg"
          src={caffeeBanner}
          alt="caffee banner"
        />
      </div>
      <div className="store-detail-page__caffeeInfo">
        <div className="store-detail-page__caffeeInfo__title">{"카페명"}</div>

        <div className="store-detail-page__caffeeInfo__list">
          <text className="store-detail-page__caffeeInfo__list__title">
            {"연락처"}
          </text>
          <text className="store-detail-page__caffeeInfo__contact">
            {"010-1234-5678"}
          </text>
        </div>

        <div
          className="store-detail-page__caffeeInfo__list"
          style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
        >
          <text className="store-detail-page__caffeeInfo__list__title">
            {"주소"}
          </text>
          <text className="store-detail-page__caffeeInfo__address">
            {"서울시 강남구 테헤란로 427"}
          </text>
        </div>

        <div
          className="store-detail-page__caffeeInfo__list"
          style={{ marginBottom: "1.37rem" }}
        >
          <text className="store-detail-page__caffeeInfo__list__title">
            {"영업 시간"}
          </text>
          <text className="store-detail-page__caffeeInfo__time">
            {"주중 9:30 - 22:30, 토요일 10:00 - 22:00, 일요일 휴무"}
          </text>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default StoreDetailPage;
