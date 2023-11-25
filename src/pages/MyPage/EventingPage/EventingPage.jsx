// import React, { useEffect,useState } from "react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import eventing1 from "../../../assets/images/eventing1.svg";
import Header from "../../../components/views/Header/Header";
import "./EventingPage.css";
//import axios from "axios";

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
  width: 284px;
  height: 449px;
`;

function EventingPage() {
  //const apiRoot = process.env.REACT_APP_API_ROOT;

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

  //const [mypageEventing, setMypageEventing] = useState([]);
  // useEffect(() => {
  //    const config = {
  //     withCredentials: true,
  //    };
  //   axios
  //   .get(`${apiRoot}/api/v1/event/main`, config)
  //   .then((response) => {
  //     setMypageEventing(response.data.events);
  //   })
  //   .catch((error) => {
  //     console.log("Error fetching data:", error);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
            <EventingImg src={event.imgUrl} alt="eventing" />
          ))}
        </StyleSlider>
        {/* <StyleSlider {...settings}>
        {mypageEventing.map((item) => (
          <EventingImg key={item.idx} src={item.imgUrl} alt="eventing" />
        ))}
      </StyleSlider> */}
      </div>
    </div>
  );
}

export default EventingPage;
