import React, { useContext } from 'react';
import { FaCartArrowDown, FaCartPlus, FaCheckSquare, FaHome, FaHotel, FaNewspaper, FaPlusSquare, FaTasks, FaUsers, FaWallet } from 'react-icons/fa';
import { MdTravelExplore } from "react-icons/md";
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import useSelected from '../../hooks/useSelected';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useBookings from '../../hooks/useBookings';
import useBooked from '../../hooks/useBooked';

const Dashboard = () => {
    const [places] = useSelected();
    const [hotels] = useBookings();
    const [booked] = useBooked();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    const person = users.find(p => p.email === user.email);

    return (
        <motion.div className="drawer md:drawer-open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <Helmet>
                <title>TravelEase | Dashboard</title>
            </Helmet>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content lg:flex flex-col items-center justify-center mt-5">
                <label htmlFor="my-drawer-2" className="ms-5 btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600 drawer-button mb-5 md:hidden">Open drawer</label>
                {
                    location.pathname === '/dashboard' ? <p className='text-2xl font-bold ms-5 md:mt-20 lg:mt-0'>Please Select a Route</p> : ''
                }
                <Outlet></Outlet>
            </div>
            <div className="drawer-side -ms-0 md:-ms-10 lg:-ms-0">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-44 lg:w-80 bg-slate-600 text-white h-full">
                    {
                        person?.role === 'admin' ? <>
                            <li><NavLink to="/dashboard/managehotel"><FaTasks></FaTasks> Manage Hotels</NavLink></li>
                            <li><NavLink to="/dashboard/allusers"><FaUsers></FaUsers> Manage Users</NavLink></li>
                        </> : person?.role === 'manager' ? <>
                            <li><NavLink to="/dashboard/addhotel"><FaPlusSquare></FaPlusSquare> Add Hotel</NavLink></li>
                            <li><NavLink to="/dashboard/myhotel"><FaNewspaper></FaNewspaper> My Hotels</NavLink></li>
                        </> :
                            <>
                                <li><NavLink to="/dashboard/myselected"><FaCartArrowDown></FaCartArrowDown> My Selected Place<span className="badge bg-green-700 text-white">+{places?.length || 0}</span></NavLink></li>
                                <li><NavLink to="/dashboard/mybookings"><FaCartPlus></FaCartPlus> My Selected Hotel<span className="badge bg-green-700 text-white">+{hotels?.length || 0}</span></NavLink></li>
                                <li>
                                    <NavLink to="/dashboard/mybooked"><FaCheckSquare></FaCheckSquare> My Booked Hotel<span className="badge bg-green-700 text-white">{booked?.length || 0}</span></NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymenthistory"><FaWallet></FaWallet> Payment History</NavLink>
                                </li>

                            </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to="/places"><MdTravelExplore></MdTravelExplore> Places</NavLink></li>
                    <li><NavLink to="/hotels"><FaHotel></FaHotel> Hotels</NavLink></li>
                </ul>

            </div>
        </motion.div>
    );
};

export default Dashboard;