import Header from "../../components/views/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./ApplyCouponPage.css";
import empty from "../../assets/images/storage_empty.svg";

const ApplyCouponPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  const cartId = params.get("cartId");
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const [coupon, setCoupon] = useState(null);
  // const [selectedCoupon, setSelectedCoupon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiRoot}/api/v1/coupon`, {
          withCredentials: true,
        });
        setCoupon(response.data);
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
          linkTo: `/payment?storeId=${storeId}&inout=${inout}&cartId=${cartId}`,
        }}
      />

      <div className="coupon-page__coupon">
        {coupon && coupon.coupons.length > 0 ? (
          <div className="coupon-page__coupon-list">
            {coupon.coupons.map((item) => (
              <Link
                to={{
                  pathname: "/payment",
                  search: `?storeId=${storeId}&inout=${inout}&cartId=${cartId}&couponId=${item.couponId}&salePrice=${item.salePrice}`,
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
        ) : (
          <div className="coupon-page__coupon-empty">
            <img
              src={empty}
              alt="empty coupon"
              className="coupon-page__coupon-empty__img"
            />
            <span className="coupon-page__coupon-empty__text">
              사용 가능한 쿠폰이 없습니다
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default ApplyCouponPage;
