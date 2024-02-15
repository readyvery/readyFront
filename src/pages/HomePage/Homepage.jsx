import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../../Atom/status";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import { IMAGES } from "../../constants/images";
import useFetchQuickOrder from "../../hooks/useFetchQuickOrder";
import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import "./Homepage.css";
// import QuickOrderComponent from "../../components/views/Quickorder/QuickOrder";
// import usePostCoupon from "../../hooks/usePostCoupons";
import React from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Banner from "../../components/views/Home/Banner/Banner";
import StoreList from "../../components/views/StoreList/StoreList";
// import EventBannerSlider from "../../components/views/EventBannerSlider/EventBannerSlider";

const HomePage = () => {
  const isAuth = useRecoilValue(isAuthenticatedState);
  const { name: userName } = useFetchUserInfo();
  const navigate = useNavigate();
  const quickOrder = useFetchQuickOrder(isAuth);
  const point = 231552;
  // const postCoupon = usePostCoupon();
  // const [couponIssued, setCouponIssued] = useState(false);
  // const handleCouponClick = (couponCode, couponId) => {
  //   postCoupon(couponCode, couponId, couponIssued, setCouponIssued);
  // };

  return (
    <div className="home">
      <Header headerProps={null} />

      <div className="home_individual">
        {isAuth ? (
          <div className="home_individual_login">
            <div className="home_individual_benefits">
              <div className="home_individual_user">
                오늘도 준비된,&nbsp;
                <span className="home_individual_user_name">{userName}</span>님
              </div>
              <div className="home_individual_point">
                <span onClick={() => navigate(`/membership`)}>
                  {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} P
                </span>
                <span
                  className="home_individual_coupon_box"
                  onClick={() => navigate(`/coupon`)}
                >
                  쿠폰함
                </span>
              </div>
            </div>

            <div className="home_individual_quick_order">
              {/* <QuickOrderComponent /> */}
              <div className="home_individual_quick_order_title">
                바로 주문
                <img
                  src={IMAGES.quickOrderGuide}
                  alt="guide"
                  className="home_individual_quick_order_guide"
                />
              </div>

              {quickOrder.length > 0 ? (
                quickOrder.map((item) => (
                  <div
                    className="home_individual_quick_order_list"
                    key={item.id}
                    onClick={() =>
                      navigate(
                        `/payment?storeId=${item.storeId}&inout=${item.inOut}&cartId=${item.cartId}`
                      )
                    }
                  >
                    <div className="home_individual_quick_order_item">
                      <div className="home_individual_quick_order_item_name">
                        {item.name}
                      </div>
                      <div className="home_individual_quick_order_item_name_detail">
                        {item.orderName}
                      </div>
                      <div className="home_individual_quick_order_item_name_price">
                        {item.amount}원
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="home_individual_quick_order_none"
                  onClick={() => navigate(`/search`)}
                >
                  첫 주문 후 이용 가능합니다!
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="home_individual_benefits">
            <div className="home_individual_welcome">Welcome :)</div>
            <div className="home_individual_not_login">
              로그인 후 이용가능합니다
              <img
                src={IMAGES.toLogin}
                alt="login"
                className="home_individual_login_btn"
                onClick={() => navigate(`/login`)}
              />
            </div>
          </div>
        )}
      </div>
      <Banner />

      <div className="home_berry_pick">베리 PICK</div>
      <StoreList />

      <div className="home_business_info">
        <div className="home_business_info_name">ReadyVery</div>

        <div className="home_business_info_content">
          상호명: 레디베리
          <br />
          사업자등록번호: 738-32-01406
          <br />
          대표: 오남택 &nbsp;|&nbsp; 고객센터: 070-8064-6199
          <br />
          주소: 경기도 부천시 원미구 지봉로 43, 산학협력관 창업 랩실(역곡동,
          가톨릭대학교 성심교정)
          <br />
          E-Mail: ohnt0307@gmail.com
          <br />
          <br />
          레디베리는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
          <br />
          따라서 레디베리는 상품거래 정보 및 거래에 대한 책임을 지지않습니다.
        </div>

        <div></div>
      </div>

      <NavBar />
    </div>
  );
};

export default HomePage;
