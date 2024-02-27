import React, { useState, useEffect, useRef } from "react";
import { IMAGES } from "../../constants/images";
import "./StoreSearch.css";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import StoreList from "../../components/views/StoreList/StoreList";

function StoreSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const debounceDelay = 500; // 디바운스 지연 시간
  const inputRef = useRef(null);

  // 사용자 입력 처리
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 디바운싱 구현
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      console.log("검색어:", searchTerm);
    }, debounceDelay);

    // 컴포넌트가 unmount되거나 다음 useEffect가 실행되기 전에 타이머를 정리
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceDelay]);

  return (
    <div className="store_search">
      <Header headerProps={{ pageName: "매장검색" }} />

      <form className="store_search_form" onSubmit={(e) => e.preventDefault()}>
        <img src={IMAGES.search} alt="search" />
        <input
          type="text"
          className="store_search_input"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          ref={inputRef}
        />
      </form>

      {/* Debounced search term을 사용하여 StoreList에 prop으로 전달 */}
      <StoreList searchTerm={debouncedSearchTerm} />

      <NavBar />
    </div>
  );
}

export default StoreSearch;
