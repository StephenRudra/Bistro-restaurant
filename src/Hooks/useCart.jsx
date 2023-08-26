import {
    useQuery
  } from '@tanstack/react-query'
import { useContext } from 'react'
import {AuthContext} from '../Providers/AuthProvider'
import useAxiosSecure from './useAxiosSecure'
  const useCart =()=>{
    const {user, loading} = useContext(AuthContext);
    const token = localStorage.getItem('access-token')
    const [axiosSecure] = useAxiosSecure();
//console.log(user)
    const { refetch, isLoading, isError, data: cart=[], error } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
       // queryFn: async ()=>{
         //   const response = await fetch(`https://bistro-server-five.vercel.app/carts?email=${user?.email}`,{
          //    headers:{
          //      authorization: `bearer ${token}`
           //   }
         //   })

         //   return response.json();
       // },
     // })
      queryFn: async ()=>{
        const response = await axiosSecure(`/carts?email=${user?.email}`)
        console.log('res from axios', response)
        return response.data;
    },
  })
      return [cart, refetch]
  }

  export default useCart;