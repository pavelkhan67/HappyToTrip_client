import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import usePlaces from "../../../hooks/usePlaces";
import Places from "../../Shared/Places";
import { motion } from "framer-motion";

const PopularPlaces = () => {

    const [place] = usePlaces();
    const popularPlace = place.filter(place => place.category === 'popular');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
        >
            <section className="mb-10">
                <SectionTitle
                    heading="Popular Places"
                ></SectionTitle>
                <div className="grid md:grid-cols-2 gap-8 pt-5">
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
        </motion.div>
    );
};

export default PopularPlaces;