import Header from "../../components/views/Header/Header";
import { Link, useLocation } from "react-router-dom";
import "./ApplyCouponPage.css";
import empty from "../../assets/images/storage_empty.svg";
import useFetchCoupons from "../../hooks/useFetchCoupons";

const ApplyCouponPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const storeId = params.get("storeId");
  const inout = params.get("inout");
  const cartId = params.get("cartId");
  const coupons = useFetchCoupons();

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
        {coupons && coupons.length > 0 ? (
          <div className="coupon-page__coupon-list">
            {coupons.map((item) => (
              <Link
                to={{
                  pathname: "/payment",
                  search: `?storeId=${storeId}&inout=${inout}&cartId=${cartId}&couponId=${item.couponId}&salePrice=${item.salePrice}`,
                  state: { selectedCoupon: item.salePrice },
                }}
                className="coupon-page__coupon-item"
                key={item.couponId}
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
