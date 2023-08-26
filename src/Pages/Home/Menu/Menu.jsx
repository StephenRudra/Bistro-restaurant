import { Helmet } from "react-helmet-async";
import Cover from '../../Cover/Cover'
import menuImg from '../../../assets/menu/banner3.jpg'
import PopMenu from '../../../Components/PopularMenu/PopMenu'
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from '../../Home/Menu/MenuCategory'
import desImg from '../../../assets/menu/dessert-bg.jpeg'
import pizImg from '../../../assets/menu/pizza-bg.jpg'
import salImg from '../../../assets/menu/salad-bg.jpg'
import soImg from '../../../assets/menu/soup-bg.jpg'
const Menu = ()=>{
    const [menu] = useMenu();
    
    const salad = menu.filter(item => item.category==='salad')
    const pizza = menu.filter(item => item.category==='pizza')
    const offered = menu.filter(item => item.category==='offered')
    const desserts = menu.filter(item => item.category==='dessert')
    const soups = menu.filter(item => item.category==='soup')
    return(
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menuImg} title="Our Menu"></Cover>
            <SectionTitle subHeading='Dont Miss' heading='Todays Offer'></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
           

           <MenuCategory items={desserts} title='Dessert' img={desImg}></MenuCategory>

           <MenuCategory items={pizza} title='Pizza' img={pizImg}></MenuCategory>
           <MenuCategory items={salad} title='Salad' img={salImg}></MenuCategory>
           <MenuCategory items={soups} title='Soup' img={soImg}></MenuCategory>
        </div>
    );
};

export default Menu;