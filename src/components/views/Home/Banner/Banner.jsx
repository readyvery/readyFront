import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useFetchEventBanners from "../../../../hooks/useFetchEventBanners";
import "./Banner.css";

const Banner = () => {
  const eventBanners = useFetchEventBanners();//이벤트 배너를 서버에서 받아옴
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0.25rem",
    autoplay: true,
    variableWidth: true,
    autoplaySpeed: 1800, //1.8s
    afterChange: (currentSlide) => setCurrentIndex(currentSlide),//이게 인덱스값 업데이트용
  };
  return (
    <div className="home_event">
      <div className="home_event_slider_benner_wrapper">
        <Slider {...settings}>
          {eventBanners.map((banner, index) => {
            return (
              <div className="home_event_slider_benner" key={index}>
                <img src={banner.bannerImg} alt={`Banner ${index}`} />
              </div>
            );
          })}
        </Slider>
        <div className="home_event_slide_index">
          <span className="home_event_slide_index_now">{currentIndex + 1}</span>/
          {eventBanners.length}
        </div>
      </div>
    </div>
  );
};

export default Banner;
