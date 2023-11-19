import React from "react";
import { Link } from "react-router-dom";
import search_cafe1 from "../../assets/images/search_cafe1.svg";
import search_cafe2 from "../../assets/images/search_cafe2.svg";
import search_cafe3 from "../../assets/images/search_cafe3.svg";
import Header from "../../components/views/Header/Header";
import "./CafeSearch.css";

function CafeSearch() {
  const dummyStoreItems = [
    {
      idx: 1,
      name: "카페 오르다",
      address: "경기도 부천시 지봉로 1",
      status: "영업중",
      time: "23:00에 영업종료",
      imgUrl: search_cafe1,
    },
    {
      idx: 2,
      name: "카페 하랑",
      address: "경기도 부천시 지봉로 2",
      status: "영업종료",
      time: "09:00에 영업시작",
      imgUrl: search_cafe2,
    },
    {
      idx: 3,
      name: "카페 드림",
      address: "경기도 부천시 지봉로 3",
      status: "영업중",
      time: "22:00에 영업종료",
      imgUrl: search_cafe3,
    },
  ];

  return (
    <div className="search-container">
      <Header pageName={"카페검색"} isClose={false} />
      <div className="search-list">
        {dummyStoreItems.map((item) => (
          <div className="search-detail-wrapper">
            <Link
              to={`/packagingStatus?storeId=${item.idx}`}
              className="search-link"
              key={item.idx}
            >
              <div className="search-details">
                <img
                  src={item.imgUrl}
                  alt="search_cafe"
                  className="search-img"
                />
                <div className="search-detail">
                  <div className="search-name">{item.name}</div>
                  <div className="search-status-time">
                    <div
                      className="search-status"
                      style={{
                        color: item.status === "영업중" ? "#D82356" : "#4F4F4F",
                      }}
                    >
                      {item.status}
                    </div>
                    &nbsp;&nbsp;
                    <div className="search-time">{item.time}</div>
                  </div>
                  <div className="search-address">{item.address}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CafeSearch;
