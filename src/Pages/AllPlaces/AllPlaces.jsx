import React from 'react';
import usePlaces from '../../hooks/usePlaces';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Places from '../Shared/Places';
import { Helmet } from 'react-helmet-async';

const AllPlaces = () => {
    const [place] = usePlaces();
    const allPlaces = place;
    return (
        <>
            <Helmet>
                <title>Happy To Trip | All Places</title>
            </Helmet>
            <SectionTitle
                heading="All Places"
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-8 my-5">
                {
                    allPlaces.map(place => <Places
                        key={place._id}
                        place={place}
                    ></Places>)
                }
            </div>
        </>
    );
};

export default AllPlaces;