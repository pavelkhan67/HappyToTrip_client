import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useSelected from '../../../../hooks/useSelected';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';

const MyPlaceList = () => {
    const [places, refetch] = useSelected();

    const handleDelete = place => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${place.name} ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/selected/${place._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your Selected Place has been deleted.',
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
                <title>TravelEase | My Place List</title>
            </Helmet>
            <div className="w-10/12 md:w-full ">
            <SectionTitle
                heading="My Place List"
            ></SectionTitle>
            </div>
            <div className="uppercase font-semibold h-[60px] px-2">
                <h3 className="text-xl">Total Place: {places.length}</h3>
            </div>
            <div className="overflow-x-auto w-full pb-10">
                <table className="table w-full ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Places</th>
                            <th>Place Name</th>
                            <th>User Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            places.map((place, index) => <tr
                                key={place._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-square rounded-md w-12 h-12">
                                            <img src={place.image} alt="Order image" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {place.name}
                                </td>
                                <td>{place.email}</td>
                                <td>
                                    <button onClick={() => handleDelete(place)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default MyPlaceList;