import { useQuery } from "@tanstack/react-query";

const usePlaces = () => {

    const {data: place = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['place'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/place');
            return res.json();
        }
    })

    return [place, loading, refetch]
}

export default usePlaces;