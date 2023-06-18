import React, { useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import useBookings from '../../hooks/useBookings';
import { Helmet } from 'react-helmet-async';

const SingleHotel = () => {
    const {user} = useContext(AuthContext);
    const [, refetch] = useBookings();
    const hotel = useLoaderData();
    const { name, image, info, location, rating, _id, price, category } = hotel;
    // console.log(hotel);

    const handleSelect = hotel => {
        // console.log(item);
        if (user && user.email) {
            const SelectedItem = { SelectedId: _id, name, image, price, location, category, email: user.email }
            fetch('http://localhost:5000/bookings', {
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
                            title: 'Hotel Added To My Hotel List.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to Select the Hotel',
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
        <div className=" bg-base-100 h-[100vh] grid grid-cols-1 lg:grid-cols-3 shadow-xl gap-5 my-5">
            <Helmet>
                <title>Happy To trip | Hotel Details</title>
            </Helmet>
            <figure><img className='lg:h-[100vh] w-full rounded-xl' src={image} alt="Hotel" /></figure>
            <div className="w-full h-full bg-base-100 shadow-xl lg:col-span-2">
                <figure className='lg:relative bg-black bg-blend-multiply hidden lg:block rounded-xl lg:h-[100vh]'><img className='opacity-40 rounded-xl h-full w-full' src={image} alt="Hotel" /></figure>
                <div className="lg:absolute lg:top-40 justify-center lg:text-white">
                    <div className=' m-5 lg:m-10'>
                        <h2 className="text-3xl font-semibold">{name}</h2>
                        <p className="pt-3 mr-5">{info}</p>
                        <p className="pt-3"><span className='font-semibold'>Location:</span> {location}</p>
                        <p className="pt-3 flex items-center gap-2"><span className='font-semibold'>Rating:</span> {rating} <FaStar className='text-yellow-500'></FaStar></p>
                        <p className="pt-3"><span className='font-semibold'>Price:</span> {price} Tk.</p>
                        <p className="pt-3"><span className='font-semibold'>Category:</span> {category}</p>
                        <div className=" pt-5">
                            <button onClick={() => handleSelect(hotel)} className='btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600'>Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleHotel;