import React, { useState } from "react";
import { IMAGES } from "../../constants/images";
import "./StoreSearch.css";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import StoreList from "../../components/views/StoreList/StoreList";

function StoreSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // 검색어와 함께 다른 페이지로 이동하거나 검색 결과를 표시할 수 있습니다.
    // 예: navigate(`/search-results?query=${searchTerm}`);
    console.log("검색어:", searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="store_search">
      <Header
        headerProps={{
          pageName: "매장검색",
          // linkTo: "/",
        }}
      />

      <form className="store_search_form" onSubmit={handleSearch}>
        <img src={IMAGES.search} alt="search" />
        <input
          type="text"
          className="store_search_input"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>

      <StoreList />

      <NavBar />
    </div>
  );
}

export default StoreSearch;
