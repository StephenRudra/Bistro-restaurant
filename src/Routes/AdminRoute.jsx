import { useContext } from "react";
import {AuthContext} from '../Providers/AuthProvider'
import {Navigate, useLocation} from 'react-router'
import useAdmin from '../Hooks/useAdmin'

const AdminRoute =({children})=>{
    const {user,loading} = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const location = useLocation();
    if(loading){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/' state={{from: location}} replace ></Navigate>
};

export default AdminRoute;