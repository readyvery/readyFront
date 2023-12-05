import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store_not_open_icon from "../../assets/images/store_not_open_icon.svg";
// import search_cafedream from "../../assets/images/search_cafedream.svg";
// import search_harang from "../../assets/images/search_harang.svg";
// import search_orda from "../../assets/images/search_orda.svg";
import Header from "../../components/views/Header/Header";
import "./CafeSearch.css";

function CafeSearch() {
  const apiRoot = process.env.REACT_APP_API_ROOT;

  const [stores, setStores] = useState([]);
  /* verypick 가게 정보 */
  useEffect(() => {
    // Fetch data from the backend API
    const config = {
      withCredentials: true,
    };
    axios
      .get(`${apiRoot}/api/v1/board/search`, config)
      .then((response) => {
        setStores(response.data.stores);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {stores.map((item) => (
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
                {!item.status && (
                  <div className="closed-icon-div">
                    <img
                      src={store_not_open_icon} // Replace with your closed image path
                      alt="closedImage"
                      className="closed-icon"
                    />
                  </div>
                )}
                <div className="search-detail">
                  <div className="search-name">{item.name}</div>
                  <div className="search-status-time">
                    <div
                      className="search-status"
                      style={{
                        color: item.status ? "#D82356" : "#4F4F4F",
                      }}
                    >
                      {item.status ? "영업중" : "영업종료"}
                    </div>
                    {/* &nbsp;&nbsp; */}
                    {/* <div className="search-time">{item.time}</div> */}
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
