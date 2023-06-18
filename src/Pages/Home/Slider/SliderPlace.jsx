
import React from "react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

SwiperCore.use([EffectCoverflow, Pagination]);
import "./slide.css";

import img1 from '../../../assets/slide/slide1.jpg'
import img2 from '../../../assets/slide/slide2.webp'
import img3 from '../../../assets/slide/slide3.jpg'
import img4 from '../../../assets/slide/slide4.webp'
import img5 from '../../../assets/slide/slide5.webp'
import img6 from '../../../assets/slide/slide6.jpeg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const SliderPlace = () => {
    return (
        <section>
            <SectionTitle
                heading={""}
            ></SectionTitle>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                <SwiperSlide><img className='h-60' src={img1} alt="" /> <h3 className="text-3xl uppercase text-center -mt-16 text-white">Srimagal</h3></SwiperSlide>
                <SwiperSlide><img className='h-60' src={img2} alt="" /> <h3 className="text-3xl uppercase text-center -mt-16 text-white">Rangamati</h3></SwiperSlide>
                <SwiperSlide><img className='h-60' src={img3} alt="" /> <h3 className="text-3xl uppercase text-center -mt-16 text-white">Ahsan Manzil</h3></SwiperSlide>
                <SwiperSlide><img className='h-60' src={img4} alt="" /> <h3 className="text-3xl uppercase text-center -mt-16 text-white">Sajek Valley</h3></SwiperSlide>
                <SwiperSlide><img className='h-60' src={img5} alt="" /> <h3 className="text-3xl uppercase text-center -mt-16 text-white">St. Martin Island</h3></SwiperSlide>
                <SwiperSlide><img className='h-60' src={img6} alt="" /> <h3 className="text-3xl uppercase text-center -mt-16 text-white">Lalbag Fort</h3></SwiperSlide>

            </Swiper>
        </section>
    );
};

export default SliderPlace;