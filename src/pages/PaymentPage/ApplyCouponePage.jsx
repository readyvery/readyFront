import Header from "../../components/views/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ApplyCouponePage.css";

const ApplyCouponPage = () => {
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const [coupone, setCoupone] = useState(null);
  // const [selectedCoupon, setSelectedCoupon] = useState(null);

  // const coupone = [
  //   {
  //     couponId: 1,
  //     couponName: "레디베리 500 할인 쿠폰",
  //     publisher: "레디베리",
  //     description: "전메뉴 할인",
  //     salePrice: 500,
  //     expirationDate: null,
  //   },
  //   {
  //     couponId: 2,
  //     couponName: "500원 할인 쿠폰",
  //     publisher: "레디베리 x CUK 쿠폰",
  //     description: "전 메뉴 사용 가능",
  //     salePrice: 500,
  //     expirationDate: "2023년 12월 18일까지",
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiRoot}/api/v1/coupon`, {
          withCredentials: true,
        });
        setCoupone(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="coupon-page">
      <Header
        headerProps={{
          pageName: "할인쿠폰",
          isClose: false,
          linkTo: "/mypage",
        }}
      />

      <div className="coupon-page__coupon-list">
        {coupone?.coupons.map((item) => (
          <Link
            to={{
              pathname: "/payment",
              state: { selectedCoupon: item.salePrice },
            }}
            className="coupon-page__coupon-item"
            key={item.couponId}
            // onClick={() => setSelectedCoupon(item)}
            style={{ textDecoration: "none" }}
          >
            <div className="coupon-page__coupon-item">
              <div className="coupon-page__coupon-item__name">
                {item.couponName}
              </div>
              <div className="coupon-page__coupon-item__publisher">
                {item.publisher}
              </div>
              <div className="coupon-page__coupon-item__expirationDate">
                {item.expirationDate}
              </div>
              <div className="coupon-page__coupon-item__description">
                {item.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ApplyCouponPage;
