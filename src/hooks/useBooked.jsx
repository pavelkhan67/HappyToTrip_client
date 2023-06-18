import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';

const useBooked = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: booked = [] } = useQuery({
        queryKey: ['payment', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/payment?email=${user?.email}`)
            // console.log('res from axios', res)
            return res.data;
        },
    })

    return [booked, refetch]

}
export default useBooked;