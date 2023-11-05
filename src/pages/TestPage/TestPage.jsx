import React from "react";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import NavBar2 from "../../components/views/NavBar/NavBar2";

function TestPage() {
  return (
    <div>
      <Header />
      <div>hello! testPage</div>
      <NavBar2 />
      <NavBar />
    </div>
  );
}

export default TestPage;
