import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import Header from "../../../components/views/Header/Header";
import "./EventingPage.css";
import useFetchEvents from "../../../hooks/useFetchEvents";

const StyleSlider = styled(Slider)`
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-dots {
    bottom: -50px;
  }
`;

const EventingImg = styled.img`
  width: 17.75rem;
  margin: 0 auto;
`;

function EventingPage() {
  const events = useFetchEvents();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <div className="event-div">
      <Header
        headerProps={{
          pageName: "진행 중인 이벤트",
          isClose: false,
          linkTo: "/mypage",
        }}
      />
      <div className="eventing-img">
        <StyleSlider {...settings}>
          {events.map((item) => (
            <Link to={item.redirectUrl}>
              <EventingImg src={item.imgUrl} alt="eventing" />
            </Link>
          ))}
        </StyleSlider>
      </div>
    </div>
  );
}

export default EventingPage;
