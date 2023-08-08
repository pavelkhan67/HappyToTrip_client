import { useQuery } from "@tanstack/react-query";

const useHotels = () => {

    const {data: hotel = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['hotel'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/hotel');
            return res.json();
        }
    })

    return [hotel, loading, refetch]
}

export default useHotels;