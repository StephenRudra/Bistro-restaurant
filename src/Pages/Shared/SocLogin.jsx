import { useContext } from "react";
import {FaGoogle} from "react-icons/fa"
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocLogin =()=>{
    const {googleSignIn} = useContext(AuthContext);
    const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

    const handleGsign = ()=>{
        googleSignIn()
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser)
            const saveUser = {name: loggedUser.displayName, email: loggedUser.email}
              fetch('https://bistro-server-five.vercel.app/users',{
                method: 'POST',
                headers:{
                  'content-type': 'application/json'
                },
                body: JSON.stringify(saveUser)
              })
              .then(res=> res.json())
              .then(()=>{
                    navigate(from,{replace: true});
                
              })
            
        })
    }
    return(
        <div>
<div className="divider"></div>
<div className="text-center my-5">
<button onClick={handleGsign} class="btn btn-circle btn-outline">
  <FaGoogle></FaGoogle>
</button>
</div>
        </div>
    );
};

export default SocLogin;