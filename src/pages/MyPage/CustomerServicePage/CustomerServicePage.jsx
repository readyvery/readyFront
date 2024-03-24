import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/views/Header/Header";
import "./CustomerServicePage.css";
import { IMAGES } from "../../../constants/images";

function CustomerServicePage() {
  return (
    <div className="customer_service">
      <Header
        headerProps={{
          pageName: "고객센터",
          // linkTo: "/mypage",
        }}
      />
      <div className="customer_service_list">
        <div className="kakao_open_chat">
          <img
            src={IMAGES.kakaoOpenChatLogo}
            alt="kakao_open_chat_logo"
            className="kakao_open_chat_logo"
          />
          <div className="kakao_open_chat_text">
            <div className="kakao_open_chat_name">레디베리</div>
            <div className="kakao_open_chat_time">평일 09:00 ~ 18:00</div>
          </div>
          <Link to="http://pf.kakao.com/_ZxiEjG/chat" className="service-chat">
            <img
              src={IMAGES.kakaoOpenChat}
              alt="kakao_open_chat_btn"
              className="kakao_open_chat_btn"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CustomerServicePage;
