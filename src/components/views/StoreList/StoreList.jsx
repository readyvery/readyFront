import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../constants/images";
import useFetchSearch from "../../../hooks/useFetchSearch";
import "./StoreList.css";

const StoreList = ({ searchTerm = "", cafe = false, booth = false }) => {
  const navigate = useNavigate();
  const stores = useFetchSearch();
  let displayStores = [];

  if (cafe && booth) {
    displayStores = stores;
  } else if (cafe) {
    displayStores = stores?.filter((item) => item.idx < 10);
  } else if (booth) {
    displayStores = stores?.filter((item) => item.idx >= 10);
  }

  // 검색어에 따라 필터링된 목록을 반환하는 로직
  const filteredStores = stores?.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // 검색어가 있을 경우 filteredStores를 사용하고, 없을 경우 기존 stores를 사용
  displayStores = searchTerm ? filteredStores : displayStores;

  return (
    <div className="store_list">
      {displayStores.map((item) => (
        <div
          key={item.idx}
          className="store_list_item"
          onClick={() => {
            if (item.idx >= 10) {
              navigate(`/store?storeId=${item.idx}&inout=2`);
            } else {
              navigate(`/packagingStatus?storeId=${item.idx}`);
            }
          }}
        >
          <img
            src={item.imgUrl}
            alt="storeImage"
            className="store_list_cafe_img"
          />
          {!item.status && (
            <img
              src={IMAGES.cafeClose}
              alt="closedImage"
              className="store_list_cafe_close"
            />
          )}
          <div className="store_list_cafe_name">{item.name}</div>
          <div className="store_list_cafe_address">{item.address}</div>
          <div className="store_list_cafe_event">
            <img
              src={IMAGES.cafeEvent}
              alt="eventTextIcon"
              className="store_list_cafe_event_icon"
            />
            {item.eventMessage}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreList;
