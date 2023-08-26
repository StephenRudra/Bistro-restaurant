import SectionTitle from '../../Components/SectionTitle/SectionTitle'
import {
    useQuery
  } from '@tanstack/react-query'
  import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const ManageItems = ()=>{
  const [axiosSecure] = useAxiosSecure();
    const {data: menu=[], isLoading: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async()=>{
            const res = await fetch('https://bistro-server-five.vercel.app/menu');
            return res.json();
        }
    })

    const handledlt =item =>{
      axiosSecure.delete(`/menu/${item._id}`)
      .then(data =>{
        if(data.deletedCount > 0){
          alert('Deleted!!')
        }
        //console.log(res.data)
        refetch();
      })

    }
    return(
        <div className="w-full">
            <SectionTitle heading="Manage All Items" subHeading="Hurry Up!"></SectionTitle>
            
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {menu.map((item, index) => <tr key={item._id}>
        <td>
          {index+1}
        </td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{item.name}</div>

            </div>
          </div>
        </td>
        <td>
          {item.category}
        </td>
        <td>{item.price}</td>
        <td>
          <button className="btn btn-ghost btn-xs">details</button>
        </td>
        <td>
        <button onClick={()=>handledlt(item)} className="btn btn-ghost btn-lg"><FaTrashAlt></FaTrashAlt></button>
        </td>
      </tr>)}

    </tbody> 
  </table>
</div>
            
        </div>
    );

};

export default ManageItems;