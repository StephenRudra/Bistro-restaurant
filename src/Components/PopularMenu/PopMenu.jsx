import { useState } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle'
import { useEffect } from 'react';
import MenuItem from '../../Pages/Shared/MenuItem'
import useMenu from '../../Hooks/useMenu'
const PopMenu = ()=>{
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category==='popular');
    
    
       //const [menu, setMenu] = useState([])
        //useEffect(()=>{
        //fetch('menu.json')
        //.then(res=>res.json())
      //  .then(data => {
         //   const popItems = data.filter(item => item.category === 'popular');
       //     setMenu(popItems)
     //   })
   // },[])                                               
    return(
        <section className='mb-5'>
<SectionTitle subHeading="Popular items" heading="From Our menu"></SectionTitle>
<div className='grid md:grid-cols-2 gap-4'>
    {
        popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
    }
</div>
        </section>
    );
};

export default PopMenu;