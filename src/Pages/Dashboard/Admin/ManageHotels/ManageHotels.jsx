import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';

const ManageHotels = () => {
    const { data: hotels = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['addedhotel'],
        queryFn: async () => {
            const res = await fetch('https://happy-to-trip-server.vercel.app/addedhotell');
            return res.json();
        }
    })
    const ManageHotel = hotels;
    console.log(ManageHotel);

    const handleApprove = item =>{
        fetch(`https://happy-to-trip-server.vercel.app/addedhotell/approve/${item._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `${item.name} is Approved!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }
    const handleDeny = item =>{
        fetch(`https://happy-to-trip-server.vercel.app/addedhotell/deny/${item._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `${item.name} is Denied!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    return (
        <div className='h-full w-11/12 mx-auto'>
            <Helmet>
                <title>Happy To Trip | Manage Hotels</title>
            </Helmet>
            <div className="w-7/12 md:w-full">
                <SectionTitle
                    heading="Manage Hotels"
                ></SectionTitle>
            </div>
            <div className="uppercase font-semibold h-[60px] flex justify-between items-center gap-5 py-10">
                <h3 className="text-xl">Total Hotels: {ManageHotel.length}</h3>
            </div>
            <div className="overflow-x-auto w-full pb-10">
                <table className="table w-full ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Hotel</th>
                            <th>Hotel Name</th>
                            <th>Manager Info</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            ManageHotel.map((item, index) => <tr
                                key={item._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-square rounded-md w-12 h-12">
                                            <img src={item.image} alt="Order image" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item?.email ? item.email : 'No Info.'}
                                </td>
                                <td>${item.price}</td>
                                <td>{item.status}</td>
                                <td>{ item.status === 'denied' || item.status === 'approved' ? <div className="flex flex-col gap-2"><button disabled={true} className="btn btn-sm normal-case">Approve</button> <button disabled={true} className="btn btn-sm normal-case ">Deny</button></div> : 
                                    <div className=" flex gap-2 flex-col">
                                        <button onClick={() => handleApprove(item)} className="btn btn-sm btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600">Approve</button>   
                                        <button onClick={() => handleDeny(item)} className="btn btn-sm btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600">Deny</button>   
                                    </div>
                                    }</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageHotels;