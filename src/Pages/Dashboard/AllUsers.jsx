import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import useAxiosSecure from '../../Hooks/useAxiosSecure'
const AllUsers = ()=>{
  const [axiosSecure] = useAxiosSecure();
const {data: users =[], refetch} = useQuery(['users'], async()=>{
    const res = await axiosSecure('/users')
    return res.data;
})

const handledlt = user =>{
  console.log(user._id)
  fetch(`https://bistro-server-five.vercel.app/users/${user._id}`,{
    method:'DELETE'
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.deletedCount>0){
      refetch();
      alert('User deleted')
    }
  })
}

const handleAdmin = user =>{
  fetch(`https://bistro-server-five.vercel.app/users/admin/${user._id}`,{
    method: 'PATCH'
  })
  .then(res => res.json())
  .then(data=>{
    if(data.modifiedCount){
      refetch();
      alert(`${user.name} made admined!`)
    }
  })

}
    return(
        <div>

<div className="overflow-x-auto mt-32 ml-20">
  <table className="table table-zebra">
    
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
            users.map((user,index)=><tr key={user._id}>
            <th>{index +1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{ user.role ==='admin' ? 'admin' : <button onClick={()=>handleAdmin(user)} className="btn btn-ghost btn-lg"><FaUserShield></FaUserShield></button>
            }</td>
            <td><button onClick={()=>handledlt(user)} className="btn btn-ghost btn-lg"><FaTrashAlt></FaTrashAlt></button></td>
          </tr>)
        }
      {/* row 1 */}
      
      
    </tbody>
  </table>
</div>

        </div>
    );
};

export default AllUsers;