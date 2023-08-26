import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle'

const Category = ()=>{
    return(
      <section>
        <SectionTitle subHeading={"From 11.00 am to 10.00 pm"} heading={"Order Online"}></SectionTitle>
       
        <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24"
      >
        <SwiperSlide><img src={slide1}></img>
        <h3 className="text-4xl uppercase text-center -mt-16 text-white">Salads</h3>
        </SwiperSlide>
        <SwiperSlide><img src={slide2}></img>
        <h3 className="text-4xl uppercase text-center -mt-16 text-white">Pizzas</h3></SwiperSlide>
        <SwiperSlide><img src={slide3}></img><h3 className="text-4xl uppercase text-center -mt-16 text-white">Soups</h3>
        </SwiperSlide>
        <SwiperSlide><img src={slide4}></img>
        <h3 className="text-4xl uppercase text-center -mt-16 text-white">Deserts</h3></SwiperSlide>
        <SwiperSlide><img src={slide5}></img>
        <h3 className="text-4xl uppercase text-center -mt-16 text-white">Drinks</h3>
        </SwiperSlide>
       
      </Swiper>
      </section>
    );
};

export default Category;