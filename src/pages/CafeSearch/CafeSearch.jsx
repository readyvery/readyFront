import React from "react";
import { Link } from "react-router-dom";
import store_not_open_icon from "../../assets/images/store_not_open_icon.svg";
import Header from "../../components/views/Header/Header";
import "./CafeSearch.css";
import StoreListApi from "../../hooks/StoreListApi";

function CafeSearch() {
  const stores = StoreListApi();

  return (
    <div className="search-container">
      <Header
        headerProps={{
          pageName: "카페 검색",
          isClose: false,
          linkTo: "/",
        }}
      />

      <div className="search-list">
        {stores.map((item) => {
          const idx = item?.idx;
          const name = item?.name;
          const address = item?.address;
          const status = item?.status;
          // const time = item?.time;
          const imgUrl = item?.imgUrl;

          return (
            <div className="search-detail-wrapper">
              <Link
                to={`/packagingStatus?storeId=${idx}`}
                className="search-link"
                key={idx}
              >
                <div className="search-details">
                  <img src={imgUrl} alt="search_cafe" className="search-img" />
                  {!status && (
                    <div className="closed-icon-div">
                      <img
                        src={store_not_open_icon} // Replace with your closed image path
                        alt="closedImage"
                        className="closed-icon"
                      />
                    </div>
                  )}
                  <div className="search-detail">
                    <div className="search-name">{name}</div>
                    <div className="search-status-time">
                      <div
                        className="search-status"
                        style={{
                          color: status ? "#D82356" : "#4F4F4F",
                        }}
                      >
                        {status ? "영업중" : "영업종료"}
                      </div>
                      {/* &nbsp;&nbsp; */}
                      {/* <div className="search-time">{time}</div> */}
                    </div>
                    <div className="search-address">{address}</div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CafeSearch;
