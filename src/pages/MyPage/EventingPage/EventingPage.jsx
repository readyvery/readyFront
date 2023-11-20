import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import eventing1 from "../../../assets/images/eventing1.svg";
import Header from "../../../components/views/Header/Header";
import "./EventingPage.css";

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

const EventImg = styled.img`
  width: 284px;
  height: 449px;
`;

function EventingPage() {
  const dummyEventingItems = [
    {
      events: [
        {
          idx: 1,
          imgUrl: eventing1,
        },
        {
          idx: 2,
          imgUrl: eventing1,
        },
        {
          idx: 3,
          imgUrl: eventing1,
        },
      ],
    },
  ];

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
          {dummyEventingItems[0].events.map((event) => (
            <EventImg src={event.imgUrl} alt="eventing" />
          ))}
        </StyleSlider>
      </div>
    </div>
  );
}

export default EventingPage;
