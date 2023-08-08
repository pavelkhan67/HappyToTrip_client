import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { AuthContext } from '../../../../provider/AuthProvider';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyHotels = () => {
    const { user } = useContext(AuthContext);
    const { data: hotels = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['addedhotel'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/addedhotel/?email=${user?.email}`);
            return res.json();
        }
    })
    const Hotels = hotels;

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
                fetch(`http://localhost:5000/addedhotel/${hotel._id}`, {
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
                <title>TravelEase | My Hotels</title>
            </Helmet>
            <div className="w-3/5 md:w-full">
            <SectionTitle
                heading="My Hotels"
            ></SectionTitle>
            </div>
            <div className="uppercase font-semibold h-[60px] px-2">
                <h3 className="text-xl">Total Hotels: {Hotels.length}</h3>
            </div>
            <div className="overflow-x-auto w-full pb-10">
                <table className="table w-full ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Hotels</th>
                            <th>Hotel Name</th>
                            <th>Price</th>
                            <th>Available Room</th>
                            <th>Booked</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Hotels.map((hotel, index) => <tr
                                key={hotel._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-square rounded-md w-12 h-12">
                                            <img src={hotel.image} alt="Hotel image" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {hotel.name}
                                </td>
                                <td>{hotel.price} Tk.</td>
                                <td>{hotel.availableRoom} room</td>
                                <td>{hotel.booked} times</td>
                                <td>{hotel.status}</td>
                                <td>
                                    <button onClick={() => handleDelete(hotel)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyHotels;