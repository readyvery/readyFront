import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import eventing1 from "../../../assets/images/eventing1.svg";
import Header from "../../../components/views/Header/Header";
import "./EventingPage.css";

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
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "50px",
    slidesToShow: 3,
    speed: 500,
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
      <div className="event-list">
        {dummyEventingItems.map((item, index) => (
          <Slider key={index} {...settings}>
            {item.events.map((event) => (
              <div key={event.idx}>
                <img
                  src={event.imgUrl}
                  alt={`eventing${event.idx}`}
                  className="eventing-img"
                />
              </div>
            ))}
          </Slider>
        ))}
      </div>
    </div>
  );
}

export default EventingPage;
