import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaCartPlus } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: 'User LogOut Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            })
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/places">Places</NavLink></li>
        <li><NavLink to="/hotels">Hotels</NavLink></li>
        {
            user ? <li><Link to="/dashboard">Dashboard</Link></li> : ''
        }

    </>

    return (
        <>
            <div className="navbar mx-auto bg-slate-900 text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu z-10 menu-compact dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52">
                            <div className='tooltip tooltip-right mx-2 my-auto' data-tip='Theme'>
                                <label className="swap swap-rotate">
                                    <input onClick={toggleTheme} type="checkbox" />
                                    <div className="swap-on bg-white text-black rounded-full p-1 font-semibold">LIGHT</div>
                                    <div className="swap-off bg-black text-white rounded-full p-1 font-semibold">DARK</div>
                                </label>
                            </div>
                            {navOptions}
                        </ul>
                    </div>
                    <div>
                        <Link to='/'><a className="btn text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-yellow-500 to-red-600  btn-ghost normal-case font-bold text-sm lg:text-xl"> Happy To Trip </a></Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='tooltip tooltip-left mx-2 my-auto flex justify-center items-center' data-tip='Theme'>
                        <label className="swap swap-rotate">
                            <input onClick={toggleTheme} type="checkbox" />
                            <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        </label>
                    </div>
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div className="tooltip tooltip-left" data-tip={user?.displayName}>
                                    <button><label className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full" >
                                            <img src={user?.photoURL} />
                                        </div>
                                    </label></button>
                                </div>
                                <ul tabIndex={0} className="mt-3 py-5 z-10 shadow-xl menu menu-sm dropdown-content  rounded-box bg-slate-900 w-40">
                                    <button onClick={handleLogOut} className='btn bg-white w-9/12 mx-auto border-0 border-b-4 border-r-4 normal-case border-green-600'><span className='text-green-600'>Log Out</span></button>
                                </ul>
                            </div>
                            : <> <NavLink to="/login"><button className='btn bg-slate-700 border-0 border-b-4 border-r-4 normal-case border-green-600'><span className='text-green-600'>Login</span></button></NavLink> </>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;