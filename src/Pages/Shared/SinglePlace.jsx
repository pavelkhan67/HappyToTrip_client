import React, { useContext, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { NavLink, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css'
import { AuthContext } from '../../provider/AuthProvider';
import useSelected from '../../hooks/useSelected';
import { Helmet } from 'react-helmet-async';

const SinglePlace = () => {
    const { user } = useContext(AuthContext);
    const [, refetch] = useSelected();
    const place = useLoaderData();
    const { _id, name, image, info, location, rating, category, hotels } = place;

    useEffect(() => {
        AOS.init();
    }, [])

    const handleSelect = place => {
        // console.log(item);
        if (user && user.email) {
            const SelectedItem = { SelectedPlaceId: _id, name, image, location, email: user.email }
            fetch('https://happy-to-trip-server.vercel.app/selected', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(SelectedItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch(); // refetch cart to update the number of items in the cart
                        Swal.fire({
                            icon: 'success',
                            title: 'Place Selected To MyPlaceList.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to Select the Place',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (

        <div className="hero min-h-screen bg-base-200 my-5">
            <Helmet>
                <title>Happy To trip | Place Details</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <img src={image} className="w-full lg:max-w-sm h-[50vh] lg:h-[100vh] rounded-lg shadow-2xl" />
                <div className='lg:ps-5' data-aos="fade-down-right" data-aos-duration="1000">
                    <h1 className="text-5xl font-bold">{name}</h1>
                    <p className="pt-5">{info}</p>
                    <p className="pt-3"><span className='font-semibold'>Location:</span> {location}</p>
                    {
                        category === 'popular' ? <p className="pt-3"><span className='font-semibold'>Best time to visit:</span> All Season</p> : <p className="pt-3"><span className='font-semibold'>Best time to visit:</span> {category} Season</p>
                    }
                    <p className="pt-3 flex items-center gap-2"><span className='font-semibold'>Rating:</span> {rating} <FaStar className='text-yellow-500'></FaStar></p>
                    <p className="py-4 text-lg font-semibold text-center">Hotels Where You Can Stay During Travel</p>
                    <div className='grid md:grid-cols-2 gap-5 mb-6'>
                        {
                            hotels.map(hotel =>
                                <div className="card w-full bg-base-100 shadow-xl">
                                    <figure className="px-10 pt-10">
                                        <img src={hotel.image} alt="Hotel" className="rounded-xl h-40 w-full" />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{hotel.name}</h2>
                                        <p><small>For more info. <NavLink to="/hotels"><span className='text-green-600 underline'>visit hotel page</span></NavLink> </small></p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='text-center'>
                        <button onClick={() => handleSelect(place)} className=" btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600">Add To My List</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePlace;