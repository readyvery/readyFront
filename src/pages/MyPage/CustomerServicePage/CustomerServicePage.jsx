import React from "react";
import { Link } from "react-router-dom";
// import chatIcon from "../../../assets/images/chat_icon.svg";
// import customerIcon from "../../../assets/images/customer_icon.svg";
import Header from "../../../components/views/Header/Header";
import "./CustomerServicePage.css";

function CustomerServicePage() {
  return (
    <div className="service-div">
      <Header
        headerProps={{
          pageName: "고객센터",
          // linkTo: "/mypage",
        }}
      />
      <div className="service-head">
        {/* <img src={customerIcon} alt="CustomerIcon" className="service-icon" /> */}
        <div className="service-text">
          <div className="service-name">레디베리</div>
          <div className="service-time">평일 09:00 ~ 18:00</div>
        </div>
        <Link to="http://pf.kakao.com/_ZxiEjG/chat" className="service-chat">
          {/* <img src={chatIcon} alt="ChatIcon" className="chat-icon" /> */}
        </Link>
      </div>
    </div>
  );
}

export default CustomerServicePage;
