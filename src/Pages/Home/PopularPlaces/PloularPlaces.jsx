import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import usePlaces from "../../../hooks/usePlaces";
import Places from "../../Shared/Places";


const PopularPlaces = () => {

    const [place] = usePlaces();
    const popularPlace = place.filter(place => place.category === 'popular');

    return (
        <section className="mb-20">
            <SectionTitle
                heading="Popular Places"
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-8">
                {
                    popularPlace.map(place => <Places
                        key={place._id}
                        place={place}
                    ></Places>)
                }
            </div>
            <div className="text-center mt-8">
            <Link to="/places"><button className="btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600">View All Places</button></Link>
            </div>
        </section>
    );
};

export default PopularPlaces;