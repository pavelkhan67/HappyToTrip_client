import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import useBooked from '../../../../hooks/useBooked';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';

const PaymentHistory = () => {
    const [booked, refetch] = useBooked();
    const PaymentHistory = booked;

    return (
        <div className='h-full w-full lg:w-11/12 mx-auto'>
            <Helmet>
                <title>Happy To Trip | My Payment History</title>
            </Helmet>
            <div className="w-8/12 md:w-full ml-2 md:ml-0">
                <SectionTitle
                    heading="My Payment History"
                ></SectionTitle>
            </div>
            <div className="uppercase font-semibold h-[60px] px-2">
                <h3 className="text-xl">Total Hotel: {PaymentHistory.length}</h3>
            </div>
            <div className="overflow-x-auto w-full pb-10">
                <table className="table w-full ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Hotel</th>
                            <th>Hotel Name</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            PaymentHistory.map((item, index) => <tr
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
                                <td>{item.price} Tk.</td>
                                <td>{item.date.split('T')[0]}</td>
                                <td>{item.transactionId}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;