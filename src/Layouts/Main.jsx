import { Outlet, useLocation } from "react-router-dom"
import Footer from '../Pages/Shared/Footer'
import Nav from '../Pages/Shared/Nav'

const Main = ()=>{
    const location = useLocation();
    //console.log(location)
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    return(
        <div>
            {noHeaderFooter || <Nav></Nav>}
            <Outlet></Outlet>
           {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;