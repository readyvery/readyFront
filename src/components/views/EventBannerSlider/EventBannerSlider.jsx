import React, { useState } from "react";
import "./EventBannerSlider.css";

const EventBannerSlider = ({ banners }) => {
  const [current, setCurrent] = useState(0);
  const length = banners.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(banners) || banners.length <= 0) {
    return null;
  }

  return (
    <div className="slider">
      {banners.map((slide, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={index}
        >
          {index === current && (
            <img src={slide.image} alt="Event Banner" className="image" />
          )}
        </div>
      ))}
      <div className="slider-index">
        {current + 1}/{length}
      </div>
    </div>
  );
};

export default EventBannerSlider;
