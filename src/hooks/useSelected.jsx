import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';
const useSelected = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: places = [] } = useQuery({
        queryKey: ['selected', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/selected?email=${user?.email}`)
            // console.log('res from axios', res)
            return res.data;
        },
    })

    return [places, refetch]

}
export default useSelected;