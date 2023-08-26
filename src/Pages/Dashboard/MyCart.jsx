import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import { FaTrashAlt } from 'react-icons/fa';
const MyCart =()=>{
    const [cart, refetch] = useCart();
    const total = cart.reduce((sum, item)=> item.price + sum, 0)

    const handledlt= item=>{
      fetch(`https://bistro-server-five.vercel.app/carts/${item._id}`,{
        method:'DELETE'
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.deletedCount>0){
          refetch();
          alert('Item deleted')
        }
      })
    }
    return(
        <div>
<div className="font-semibold h-[60px] flex justify-evenly items-center">
     <h2 className="text-3xl">Total item: {cart.length}</h2>
<h2 className="text-3xl">Total Price: {total}</h2>
<Link to='/dashboard/payment'><button className="btn btn-warning btn-xs">Pay</button></Link>
</div>
<div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>#
        </th>
        <th>Food</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        cart.map((item, index)=> <tr key={item._id}>
        <td>
          {index+1}
        </td>
        <td>
          
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          
        </td>
        <td>
          {item.name}
        </td>
        <td>${item.price}</td>
        <td>
          <button onClick={()=>handledlt(item)} className="btn btn-ghost btn-lg"><FaTrashAlt></FaTrashAlt></button>
        </td>
      </tr>)
      }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyCart;