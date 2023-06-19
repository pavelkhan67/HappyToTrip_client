import React from 'react';
import { Link } from 'react-router-dom';

const Hotels = ({hotel}) => {
    // console.log(hotel);
    const {name, image, info, location, rating, _id, price, category} = hotel;
    return (
        <div className="card w-full bg-base-200 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="Place" className="rounded-xl h-52 lg:h-72 w-full" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p><span className='font-semibold'>Location:</span> {location}</p>
                <div className="card-actions mt-3">
                <Link to={`/hotel/${_id}`}><button className="btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600">See Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Hotels;