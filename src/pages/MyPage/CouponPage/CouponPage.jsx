import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../../components/views/Header/Header";
import "./CouponPage.css";
import empty from "../../../assets/images/storage_empty.svg";

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
  );
}

export default CouponPage;
