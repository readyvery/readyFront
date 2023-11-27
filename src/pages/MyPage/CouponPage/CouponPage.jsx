import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../../components/views/Header/Header";
import "./CouponPage.css";

function CouponPage() {
  const apiRoot = process.env.REACT_APP_API_ROOT;
  // const dummyCouponItems = [
  //   {
  //     idx: 1,
  //     name: "500원 할인 쿠폰",
  //     content: "레디베리 x CUK 쿠폰",
  //     date: "2023년 12월 18일까지",
  //     limit: "전 메뉴 사용 가능",
  //   },
  //   {
  //     idx: 2,
  //     name: "깜짝 할인 쿠폰",
  //     content: "내가 주고 싶어서 주는 쿠폰",
  //     date: "2023년 11월 19일까지",
  //     limit: "아샷추만 사용 가능",
  //   },
  // ];

  const [couponCheck, setCouponCheck] = useState([]);

  useEffect(() => {
    const config = {
      withCredentials: true,
    };
    axios
      .get(`${apiRoot}/api/v1/coupon`, config)
      .then((response) => {
        setCouponCheck(response.data.coupons);
      })
      .catch((error) => {
        console.log("Error fetching user coupons: ", error.response);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className="coupon-list-box">
          {couponCheck.map((item) => (
            <div className="coupon-item">
              <div className="coupon-item-name">{item.couponName}</div>
              <div className="coupon-item-content">{item.publisher}</div>
              <div className="coupon-item-date">{item.expirationDate}</div>
              <div className="coupon-item-limit">{item.description}</div>
            </div>
          ))}

          {/* {dummyCouponItems.map((item) => (
            <div className="coupon-item" key={item.idx}>
              <div className="coupon-item-name">{item.name}</div>
              <div className="coupon-item-content">{item.content}</div>
              <div className="coupon-item-date">{item.date}</div>
              <div className="coupon-item-limit">{item.limit}</div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default CouponPage;
