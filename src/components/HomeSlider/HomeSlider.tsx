import React from "react";
import Slider from "react-slick";
import slider1 from"./../../assets/imges/slider-image-1-Dh9d2U6G.jpeg"
import slider2 from"./../../assets/imges/slider-image-2-Xt88XJy9.jpeg"
import slider3 from"./../../assets/imges/slider-image-3-BtMvVf4V.jpeg"
import img1 from "./../../assets/imges/grocery-banner-fECAEdf_.png"
import img2 from "./../../assets/imges/grocery-banner-2-BWrZqEBM.jpeg"
const HomeSlider = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplayspeed:1000,
      };
      return (
        <section className="w-[90%] max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 my-20 ">
        <div className="flex flex-wrap justify-center items-center">
            <div className="w-2/3">
                <Slider {...settings}>
                    <div>
                        <img src={slider1} className="w-full h-[200px] md:h-[350px] lg:h-[450px]" alt="slider1" />
                    </div>
                    <div>
                        <img src={slider2} className="w-full h-[200px] md:h-[350px] lg:h-[450px]" alt="slider2" />
                    </div>
                    <div>
                        <img src={slider3} className="w-full h-[200px] md:h-[350px] lg:h-[450px]" alt="slider3" />
                    </div>
                </Slider>
            </div>
            <div className="w-1/3">
                <img src={img1} className="w-full h-[100px] md:h-[175px] lg:h-[225px]" alt="grocery" />
                <img src={img2} className="w-full h-[100px] md:h-[175px] lg:h-[225px]" alt="grocery" />
            </div>
        </div>
    </section>
    
    
    
      );
}

export default HomeSlider
