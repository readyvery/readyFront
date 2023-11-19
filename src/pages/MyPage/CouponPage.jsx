import React from "react";
import Header from "../../components/views/Header/Header";
import "./CouponPage.css";

function CouponPage() {
  const dummyCouponItems = [
    {
      idx: 1,
      name: "500원 할인 쿠폰",
      content: "레디베리 x CUK 쿠폰",
      date: "2023년 12월 18일까지",
      limit: "전 메뉴 사용 가능",
    },
    {
      idx: 2,
      name: "깜짝 할인 쿠폰",
      content: "내가 주고 싶어서 주는 쿠폰",
      date: "2023년 11월 19일까지",
      limit: "아샷추만 사용 가능",
    },

    // 추가 아이템들
  ];

  return (
    <div className="coupon-div">
      <Header pageName={"할인쿠폰"} isClose={false} />

      <div className="coupon-list">
        <div className="coupon-list-box">
          {dummyCouponItems.map((item) => (
            <div className="coupon-item" key={item.idx}>
              <div className="coupon-item-name">{item.name}</div>
              <div className="coupon-item-content">{item.content}</div>
              <div className="coupon-item-date">{item.date}</div>
              <div className="coupon-item-limit">{item.limit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CouponPage;
