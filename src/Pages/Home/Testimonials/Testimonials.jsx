import SectionTitle from '../../../Components/SectionTitle/SectionTitle'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
const Testimonials = ()=>{
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        fetch('reviews.json')
        .then(res => res.json())
        .then(data => setReviews(data))
    },[])
    
    return(
        <section>
            
            <SectionTitle subHeading={'What they say'} heading={'Testimonials'}>

            </SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        
        {
            reviews.map(review => <SwiperSlide key={review._id}>
                 <Rating
      style={{ maxWidth: 180 }}
      value={review.rating}
      readOnly
    />
                <p>{review.details}
            <h2 className='text-3xl text-yellow-400'>{review.name}</h2>
            </p></SwiperSlide>)
        }
      </Swiper>
        </section>
    );
};

export default Testimonials;