import React from 'react';
import useHotels from '../../../hooks/useHotels';
import Hotels from '../../Shared/Hotels';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const PopularHotels = () => {
    const [hotel] = useHotels();
    const popularHotel = hotel.filter(hotel => hotel.rating >= 4.9);

    return (
        <section className="mb-20">
            <SectionTitle
                heading="Popular Hotels"
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-8">
                {
                    popularHotel.map(hotel => <Hotels
                        key={hotel._id}
                        hotel={hotel}
                    ></Hotels>)
                }
            </div>
            <div className="text-center mt-8">
                <Link to="/hotels"><button className="btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600">View All Hotels</button></Link>
            </div>
        </section>
    );
};

export default PopularHotels;