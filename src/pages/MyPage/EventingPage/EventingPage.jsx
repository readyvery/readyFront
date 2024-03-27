import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Header from "../../../components/views/Header/Header";
import useFetchEvents from "../../../hooks/useFetchEvents";
import "./EventingPage.css";
import Empty from "../../../components/views/PageComponent/Empty";

function EventingPage() {
  const navigate = useNavigate();
  const events = useFetchEvents();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
  };

  return (
    <div className="event-div">
      <Header
        headerProps={{
          pageName: "진행 중인 이벤트",
          isClose: false,
          // linkTo: "/mypage",
        }}
      />

      {events && events?.length > 0 ? (
        <div className="eventing-img">
          <Slider className="eventing_slider_benner" {...settings}>
            {events.map((item) => (
              <div key={item} onClick={() => navigate(item.redirectUrl)}>
                <img src={item.imgUrl} alt="eventing" />
                {console.log(item)}
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="event-empty">
          <Empty />
        </div>
      )}
    </div>
  );
}

export default EventingPage;
