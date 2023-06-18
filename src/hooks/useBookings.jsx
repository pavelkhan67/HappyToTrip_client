import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';
const useBookings = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: hotels = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/bookings?email=${user?.email}`)
            // console.log('res from axios', res.date)
            return res.data;
        },
    })

    return [hotels, refetch]

}
export default useBookings;