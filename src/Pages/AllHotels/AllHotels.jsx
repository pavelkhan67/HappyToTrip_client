import React, { useState } from 'react';
import useHotels from '../../hooks/useHotels';
import Hotels from '../Shared/Hotels';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";

const AllHotels = () => {
    const [hotel] = useHotels();
    // const allHotels = hotel;
    const [searchText, setSearchText] = useState("");
    const [allHotels, setAllHotels] = useState(hotel);

    const handleSearch = () => {
        fetch(`https://happy-to-trip-server.vercel.app/search/${searchText}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setAllHotels(data)
            });
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
        >
            <Helmet>
                <title>TravelEase | All Hotels</title>
            </Helmet>
            <div className="lg:my-10">
                <SectionTitle
                    heading="All Hotels"
                ></SectionTitle>
            </div>
            <div className=" pb-8 flex justify-center items-center">
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder='Hotel Location or Name'
                    className="p-2 rounded-md shadow-xl border-2"
                />
                <button className='btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600 btn-sm ms-2' onClick={handleSearch}>Search</button>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-5">
                {
                    allHotels.map(hotel => <Hotels
                        key={hotel._id}
                        hotel={hotel}
                    ></Hotels>)
                }
            </div>
        </motion.div>
    );
};

export default AllHotels;