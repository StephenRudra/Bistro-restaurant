import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from '../Layouts/Main'
import Home from '../Pages/Home/Home/Home'
import Menu from '../Pages/Home/Menu/Menu'
import Order from '../Pages/Order/Order/Order'
import Login from '../Pages/Login/Login'
import SignUp from '../Pages/Sign Up/SignUp'
import PrivateRoute from '../Routes/Proute'
import Secret from '../Secret'
import Dashboard from '../Layouts/Dashboard'
import MyCart from '../Pages/Dashboard/MyCart'
import AllUsers from '../Pages/Dashboard/AllUsers'
import AddItem from '../Pages/Dashboard/AddItem'
import AdminRoute from '../Routes/AdminRoute'
import ManageItems from '../Pages/Dashboard/ManageItems'
import Payment from '../Pages/Dashboard/Payment'
import Error from '../Pages/Shared/Error'
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'menu',
          element: <Menu></Menu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path: 'mycart',
          element: <MyCart></MyCart>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path: 'allusers',
          element: <AllUsers></AllUsers>
        },
        {
          path: 'addItem',
          element: <AdminRoute><AddItem></AddItem></AdminRoute>
        },
        {
          path: 'manageitems',
          element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
        }
      ]
    },
    {
      path: '*',
      element: <Error></Error>
    }
  ]);

  export default router;