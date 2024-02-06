import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../constants/images";
import "./CafeSearch.css";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import useFetchSearch from "../../hooks/useFetchSearch";
import StoreList from "../../components/views/StoreList/StoreList";

function CafeSearch() {
  const navigate = useNavigate();
  const stores = useFetchSearch();

  return (
    <div className="search-container">
      <Header
        headerProps={{
          pageName: "매장검색",
          isClose: false,
          linkTo: "/",
        }}
      />

      <StoreList stores={stores} />

      <NavBar />
    </div>
  );
}

export default CafeSearch;
