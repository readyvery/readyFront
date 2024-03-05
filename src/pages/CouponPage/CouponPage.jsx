import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/views/Header/Header";
import Empty from "../../components/views/PageComponent/Empty";
import useFetchCoupons from "../../hooks/useFetchCoupons";
import "./CouponPage.css";

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
              // 쿠폰함은 멤버십페이지, 메인 페이지에서 접근 가능, 뒤로가기 시, window.history.back()을 하기 위해서 
              : null,
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
