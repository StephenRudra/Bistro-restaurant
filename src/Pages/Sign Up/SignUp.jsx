import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import {useNavigate, useLocation} from 'react-router-dom'



const SignUp =()=>{
  const navigate = useNavigate();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const {createUser, updateProf}= useContext(AuthContext);
    const onSubmit= data =>{ 
        
        createUser(data.email, data.password)
        .then(result=>{
            const loggedUser = result.user;
            
            updateProf(data.name, data.photoURL)
            .then(()=>{
              const saveUser = {name: data.name, email: data.email}
              fetch('https://bistro-server-five.vercel.app/users',{
                method: 'POST',
                headers:{
                  'content-type': 'application/json'
                },
                body: JSON.stringify(saveUser)
              })
              .then(res=> res.json())
              .then(data=>{
                if(data.insertedId){
                  reset();
                  navigate('/')
                }
              })
             
            })
            .catch(error=> console.log(error))
        })
    };

    
    return(
       <>
       <Helmet>
        <title>Bistro Boss | Sign Up</title>
       </Helmet>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign up now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name", {required: true})} name="name" placeholder="enter name" className="input input-bordered"
           />
           {errors.name && <span className="text-red-600">Required Field!</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" {...register("PhotoURL", {required: true})} placeholder="enter photo" className="input input-bordered"
           />
           {errors.name && <span className="text-red-600">Required Field!</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email",{required: true, minLength: 6, maxLength:20})} name="email" placeholder="email" className="input input-bordered" />
          {errors.email && <span className="text-red-600">Required Field!</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password",{required: true})} name="password" placeholder="password" className="input input-bordered" />
          {errors.password && <span className="text-red-600">Required Field!</span>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          
          <input type="submit" value='Sign Up' className="btn btn-primary"></input>
        </div>
      </form>
    </div>
  </div>
</div>
       
       </>
    );
};

export default SignUp;