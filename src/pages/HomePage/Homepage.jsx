import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import ORDA from "../../assets/images/caffee_banner.svg";

function Homepage() {
  return (
    <div>
      <Header />
      <Link to="/cafe/:cafeId">
        <img src={ORDA} alt="오르다" />
      </Link>{" "}
      <NavBar />
    </div>
  );
}

export default Homepage;
