import React from 'react';
import usePlaces from '../../hooks/usePlaces';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Places from '../Shared/Places';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";

const AllPlaces = () => {
    const [place] = usePlaces();
    const allPlaces = place;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
        >
            <Helmet>
                <title>Happy To Trip | All Places</title>
            </Helmet>
            <div className="lg:my-10">
                <SectionTitle
                    heading="All Places"
                ></SectionTitle>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-5">
                {
                    allPlaces.map(place => <Places
                        key={place._id}
                        place={place}
                    ></Places>)
                }
            </div>
        </motion.div>
    );
};

export default AllPlaces;