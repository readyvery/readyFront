import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { IMAGES } from "../../../../constants/images";
import "./Banner.css";

const Banner = () => {
  const navigate = useNavigate();
  const eventBanners = [
    // { bannerImg: "https://readyvery.com/statics/images/event/ic_home_event1.png" },
    // { bannerImg: "https://readyvery.com/statics/images/event/ic_home_event2.png" },
    // { bannerImg: "https://readyvery.com/statics/images/event/ic_home_event3.png" },
    { bannerImg: IMAGES.banner_img },
    { bannerImg: IMAGES.banner2_img },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    variableWidth: true,
    autoplaySpeed: 1800, //1.8s
    afterChange: (currentSlide) => setCurrentIndex(currentSlide), //이게 인덱스값 업데이트용
  };

  return (
    <div className="home_event">
      <div className="home_event_slider_benner_wrapper">
         <Slider {...settings} >
          {eventBanners.map((item) => {
            return (
              <div
                className="home_event_slider_benner"
                key={item}
                // onClick={() => navigate(`/search`)}
                onClick={() => navigate(`/booth`)}
              >
                <img src={item.bannerImg} alt={`Banner ${item}`} />
              </div>
            );
          })}
        </Slider>
        <div className="home_event_slide_index">
          <span className="home_event_slide_index_now">{currentIndex + 1}</span>
          /{eventBanners.length}
        </div>
      </div>
    </div>
  );
};

export default Banner;
