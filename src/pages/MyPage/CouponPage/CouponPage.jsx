import React from "react";
import empty from "../../../assets/images/storage_empty.svg";
import Header from "../../../components/views/Header/Header";
import "./CouponPage.css";
import useFetchCoupons from "../../../hooks/useFetchCoupons";

function CouponPage() {
  const couponCheck = useFetchCoupons();

  return (
    <div className="coupon-div">
      <Header
        headerProps={{
          pageName: "할인쿠폰",
          isClose: false,
          linkTo: "/mypage",
        }}
      />

      <div className="coupon-list">
        {couponCheck && couponCheck.length > 0 ? (
          <div className="coupon-list-box">
            {couponCheck.map((item) => (
              <div className="coupon-item">
                <div className="coupon-item-name">{item.couponName}</div>
                <div className="coupon-item-content">{item.publisher}</div>
                <div className="coupon-item-date">{item.expirationDate}</div>
                <div className="coupon-item-limit">{item.description}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="coupon-list-empty">
            <img
              src={empty}
              alt="empty coupon"
              className="coupon-list-empty__img"
            />
            <span className="coupon-list-empty__text">
              사용 가능한 쿠폰이 없습니다
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CouponPage;
