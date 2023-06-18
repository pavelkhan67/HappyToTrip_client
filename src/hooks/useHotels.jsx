import { useQuery } from "@tanstack/react-query";

const useHotels = () => {

    const {data: hotel = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['hotel'],
        queryFn: async() => {
            const res = await fetch('https://happy-to-trip-server.vercel.app/hotel');
            return res.json();
        }
    })

    return [hotel, loading, refetch]
}

export default useHotels;