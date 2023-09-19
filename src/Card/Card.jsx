import { useContext } from "react";
import {AuthContext} from '../Providers/AuthProvider'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import useCart from '../Hooks/useCart'

const Card = ({item})=>{
  const {user} = useContext(AuthContext);
  const [, refetch] = useCart();
  const cart = useCart();
  //console.log(user)
  const navigate = useNavigate();
  const handleCart = item =>{
console.log(item)
if(user && user.email){
  const orderItem = {foodeItem: _id, name, image, price, email: user.email}
  fetch('http://localhost:5000/carts',{
    method: 'POST',
    headers:{
      'content-type': 'application/json'
    },
    body: JSON.stringify(orderItem)
  })
  .then(res=> res.json())
  .then(data=>{
    if(data.insertedId){
      refetch();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Added to cart',
        showConfirmButton: false,
        timer: 1500
      })
    }
   
  })
}
else{
  Swal.fire({
    title: 'Login to order!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Login now!'
  }).then((result) => {
    if (result.isConfirmed) {
      navigate('/login')
    }
  })
}
  }
    const {name, image, price,recipe, _id} = item;
    return(
<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image} /></figure>
  <p className="absolute right-0 bg-black text-white mr-4 mt-4 px-4">{price}</p>
  <div className="card-body text-center">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
      <button onClick={()=>handleCart(item)} className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    );
};

export default Card;