import { useContext } from "react"
import {AuthContext} from '../Providers/AuthProvider'
import useAxiosSecure from './useAxiosSecure'
import {
    useQuery
  } from '@tanstack/react-query'

const useAdmin = ()=>{
    const {user, loading} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const {data: isAdmin} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            console.log(res)
            return res.data.admin;
        }

    })
    return [isAdmin]
}
export default useAdmin;