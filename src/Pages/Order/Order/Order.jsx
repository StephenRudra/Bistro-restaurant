import { useState } from 'react';
import ordCov from '../../../assets/shop/banner2.jpg'
import Cover from '../../Cover/Cover'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Card from '../../../Card/Card'
import useMenu from '../../../Hooks/useMenu';
import OrderTab from '../Tab/OrderTab'
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const Order =()=>{
  const categories = ['Salad', 'Pizza', 'Soup', 'Dessert', 'Drink'];
  //const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
  const {category} = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  //console.log(initialIndex)
  const [menu] = useMenu();

//console.log(category);
    const salad = menu.filter(item => item.category==='salad')
    const pizza = menu.filter(item => item.category==='pizza')
    const drink = menu.filter(item => item.category==='drinks')
    const dessert = menu.filter(item => item.category==='dessert')
    const soup = menu.filter(item => item.category==='soup')
    
    return(
        <div>
          <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
<Cover img={ordCov} title='Our Shop'></Cover>
<Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
  <TabList>
    <Tab>Salad</Tab>
    <Tab>Pizza</Tab>
    <Tab>Soup</Tab>
    <Tab>Dessert</Tab>
    <Tab>Drinks</Tab>
    
  </TabList>
  <TabPanel>
   <OrderTab items={salad}></OrderTab>
  </TabPanel>
  <TabPanel><OrderTab items={pizza}></OrderTab></TabPanel>
  <TabPanel><OrderTab items={soup}></OrderTab></TabPanel>
  <TabPanel><OrderTab items={dessert}></OrderTab></TabPanel>
  <TabPanel><OrderTab items={drink}></OrderTab></TabPanel>
  
</Tabs>
        </div>
    );
};

export default Order;