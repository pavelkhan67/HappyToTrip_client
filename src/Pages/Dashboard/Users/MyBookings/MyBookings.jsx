import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useBookings from '../../../../hooks/useBookings';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';

const MyBookings = () => {
    const [hotels, refetch] = useBookings();
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const [selectedHotelPrice, setSelectedHotelPrice] = useState(null);
    const [bookingDays, setBookingDays] = useState('');
    const [bookingDate, setBookingDate] = useState('');

    const handlePay = hotel => {
        setSelectedHotelId(hotel._id);
        setSelectedHotelPrice(hotel.price);
    }

    const handleDelete = hotel => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${hotel.name} ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://happy-to-trip-server.vercel.app/bookings/${hotel._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your Selected Hotel has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className='h-full w-11/12 mx-auto'>
            <Helmet>
                <title>Happy To Trip | My Hotel List</title>
            </Helmet>
            <div className="w-full ">
                <SectionTitle
                    heading="My Hotel List"
                ></SectionTitle>
            </div>
            <div className="overflow-x-auto w-full pb-10 absolute md:static">
                <table className="table w-full ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Hotels</th>
                            <th>Hotel Name</th>
                            <th>User Email</th>
                            <th>Price</th>
                            <th>Delete</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            hotels.map((hotel, index) => <tr
                                key={hotel._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-square rounded-md w-12 h-12">
                                            <img src={hotel.image} alt="Order image" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {hotel.name}
                                </td>
                                <td>{hotel.email}</td>
                                <td>{hotel.price} Tk.</td>
                                <td>
                                    <button onClick={() => handleDelete(hotel)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            window.my_modal_1.showModal();
                                            handlePay(hotel);
                                        }}
                                        className="btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600"
                                    >
                                        PAY
                                    </button>
                                </td>
                            </tr>)

                        }
                    </tbody>
                </table>
                <dialog id="my_modal_1" className="modal relative -top-40 md:static md:-top-0">
                    <form method="dialog" className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <div>
                            <label htmlFor="bookingDays" className="block">Number of days:</label>
                            <input
                                type="number"
                                id="bookingDays"
                                value={bookingDays}
                                onChange={e => setBookingDays(e.target.value)}
                                className="border border-gray-300 rounded-md px-2 py-1 mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="bookingDate" className="block">Booking date:</label>
                            <input
                                type="date"
                                id="bookingDate"
                                value={bookingDate}
                                onChange={e => setBookingDate(e.target.value)}
                                className="border border-gray-300 rounded-md px-2 py-1 mt-1"
                            />
                        </div>
                        <p className='font-semibold pt-5'>Total Taka: <span className='text-green-600'>{selectedHotelPrice * bookingDays} Tk.</span></p>
                        <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <Link to={`/dashboard/payment/${selectedHotelId}`}><button className="btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600">PAY</button></Link>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    );
};


export default MyBookings;