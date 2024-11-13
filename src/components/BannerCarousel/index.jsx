import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../BannerCarousel/banner.css"

const BannerCarousel = ({ banners }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the speed for autoplay
    arrows: false, // Disable arrows
  };

  return (
    <Slider {...settings}>
      {banners.map((banner) => (
        <div key={banner.id}>
          <img
            src={banner.image}  // Adjusted to use 'banner.image'
            alt={`Banner ${banner.id}`}  // Dynamic alt text based on banner id
            className="w-full h-[600px] object-cover"  // Adjust height and object cover styling
          />
        </div>
      ))}
    </Slider>
  );
};

export default BannerCarousel;
