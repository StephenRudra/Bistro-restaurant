import Banner from '../Banner/Banner'
import Category from '../Category/Category'
import PopMenu from '../../../Components/PopularMenu/PopMenu'
import Featured from '../Featured/Featured'
import Testimonials from '../Testimonials/Testimonials'
import { Helmet } from 'react-helmet-async'
const Home = ()=>{
    return(
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopMenu></PopMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;