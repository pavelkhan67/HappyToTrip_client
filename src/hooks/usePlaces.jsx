import { useQuery } from "@tanstack/react-query";

const usePlaces = () => {

    const {data: place = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['place'],
        queryFn: async() => {
            const res = await fetch('https://happy-to-trip-server.vercel.app/place');
            return res.json();
        }
    })

    return [place, loading, refetch]
}

export default usePlaces;