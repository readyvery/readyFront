import Header from "../../components/views/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import "./CouponPage.css";
import useFetchCoupons from "../../hooks/useFetchCoupons";
import Empty from "../../components/views/PageComponent/Empty";

const CouponPage = () => {
  const navigate = useNavigate();
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
          pageName: "쿠폰함",
          linkTo:
            storeId && inout && cartId
              ? `/payment?storeId=${storeId}&inout=${inout}&cartId=${cartId}`
              : `/`,
        }}
      />

      <div className="coupon-page__coupon">
        {coupons && coupons.length > 0 ? (
          <div className="coupon-page__coupon-list">
            {coupons.map((item) => (
              <div
                className="coupon-page__coupon-item"
                key={item.couponId}
                onClick={() => {
                  if (storeId) {
                    navigate(
                      `/payment?storeId=${storeId}&inout=${inout}&cartId=${cartId}`,
                      {
                        state: {
                          selectedCoupon: item.couponId,
                          salePrice: item.salePrice,
                        },
                      }
                    );
                  }
                }}
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
              </div>
            ))}
          </div>
        ) : (
          <div className="coupon-page__empty">
            <Empty />
          </div>
        )}
      </div>
    </div>
  );
};
export default CouponPage;
