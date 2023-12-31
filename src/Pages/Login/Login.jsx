import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import {AuthContext} from '../../Providers/AuthProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocLogin from '../Shared/SocLogin'
const Login = ()=>{
  const captchaRef = useRef(null)
  const [disabled, setDisabled] = useState(true);
  const {signIn} = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  useEffect(()=>{
    loadCaptchaEnginge(6);
  },[])
    const handleLogin= event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        //console.log(email,password)
        signIn(email,password)
        .then(result =>{
          const user = result.user;
          console.log(user);
          Swal.fire({
            title: 'Login Successfull!',
            showClass:{
              popup: 'animate_animated animate_fadeInDown'
            },
            hideClass:{
              popup: 'animate_animated animate_fadeOutUp'
            }
          });
          navigate(from,{replace: true});
        })
    }
    const handleVal = ()=>{
      //const user_captcha_value = e.target.value; handleVal = (e)
      const user_captcha_value = captchaRef.current.value;
      if(validateCaptcha(user_captcha_value)){
        setDisabled(false);
      }
      else{
        setDisabled(true)
      }
    }

    return(
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col md:flex-row-reverse">
    <div className="text-center md:w-1/2 lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
          <LoadCanvasTemplate />
          </label>
          <input type="text" ref={captchaRef} name="captcha" placeholder="enter above text" className="input input-bordered" />
          <button onClick={handleVal} disabled className="btn btn-outline btn-xs mt-2">Validate</button>
        </div>
        <div className="form-control mt-6">
          
          <input type="submit" value='Login' className="btn btn-primary"></input>
        </div>
      </form>
      <p className='ml-10'>New Here? <Link to='/signup'>Create Acc</Link></p>
      
        <SocLogin></SocLogin>
      
    </div>
  </div>
</div>
    );
};

export default Login;