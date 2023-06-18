import React, { useState } from 'react';
import useHotels from '../../hooks/useHotels';
import Hotels from '../Shared/Hotels';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

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
        <>
            <Helmet>
                <title>Happy To Trip | All Hotels</title>
            </Helmet>
            <SectionTitle
                heading="All Hotels"
            ></SectionTitle>
            <div className=" py-5 flex justify-center items-center">
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder='Enter Hotel Name'
                    className="p-2 rounded-md shadow-xl border-2"
                />
                <button className='btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600 btn-sm ms-2' onClick={handleSearch}>Search</button>
            </div>
            <div className="grid md:grid-cols-2 gap-8 my-5">
                {
                    allHotels.map(hotel => <Hotels
                        key={hotel._id}
                        hotel={hotel}
                    ></Hotels>)
                }
            </div>
        </>
    );
};

export default AllHotels;