import React, { useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/home/img1.jpg'
import img2 from '../../../assets/home/img2.jpg'
import img3 from '../../../assets/home/img4.jpg'
import img4 from '../../../assets/home/img3.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Banner = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
        >
            <Carousel className='text-center'>
                <div className="relative w-full h-[73vh] lg:h-[90vh]">
                    <img src={img1} className="w-full h-full" />
                    <div className=" absolute h-full flex items-center gap-4 left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className='text-white space-y-7 w-10/12 lg:w-1/2 pl-16' data-aos="fade-down-right" data-aos-duration="1000">
                            <h2 className=' text-4xl lg:text-5xl font-bold text-start'>Travel opens your heart, broadens your mind, and fills your life with stories to tell.</h2>
                            <p>Welcome to TravelEase! Your gateway to unforgettable travel experiences. Discover, explore, and create memories that last a lifetime. Start your journey with us today. Happy travels from our team</p>
                            <div className='flex gap-5 '>
                                <Link to='/places'>
                                    <button className='btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600'>See More</button>
                                </Link>
                                <Link to='/hotels'>
                                    <button className='btn btn-outline text-white border-0 border-b-4 border-r-4 bg-slate-900'>Book Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-[73vh] lg:h-[90vh]">
                    <img src={img2} className="w-full h-full" />
                    <div className=" absolute h-full flex items-center gap-4 left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className='text-white space-y-7 w-10/12 lg:w-1/2 pl-16' data-aos="fade-down-right" data-aos-duration="1000">
                            <h2 className=' text-4xl lg:text-5xl font-bold text-start'>I want to make memories all over the world.</h2>
                            <p>Welcome to TravelEase, where your travel dreams come true. Embark on extraordinary adventures, uncover hidden gems, and create lifelong memories. Start your journey with us today. Happy travels from our team</p>
                            <div className='flex gap-5 '>
                                <Link to='/places'>
                                    <button className='btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600'>See More</button>
                                </Link>
                                <Link to='/hotels'>
                                    <button className='btn btn-outline text-white border-0 border-b-4 border-r-4 bg-slate-900'>Book Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-[73vh] lg:h-[90vh]">
                    <img src={img3} className="w-full h-full" />
                    <div className=" absolute h-full flex items-center gap-4 left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className='text-white space-y-7 w-10/12 lg:w-1/2 pl-16' data-aos="fade-down-right" data-aos-duration="1000">
                            <h2 className=' text-4xl lg:text-5xl font-bold text-start'>Happiness is planning a trip with the ones that you love.</h2>
                            <p>Welcome to TravelEase! Your gateway to unforgettable travel experiences. Discover, explore, and create memories that last a lifetime. Start your journey with us today. Happy travels from our team</p>
                            <div className='flex gap-5 '>
                                <Link to='/places'>
                                    <button className='btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600'>See More</button>
                                </Link>
                                <Link to='/hotels'>
                                    <button className='btn btn-outline text-white border-0 border-b-4 border-r-4 bg-slate-900'>Book Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-[73vh] lg:h-[90vh]">
                    <img src={img4} className="w-full h-full" />
                    <div className=" absolute h-full flex items-center gap-4 left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className='text-white space-y-7 w-10/12 lg:w-1/2 pl-16' data-aos="fade-down-right" data-aos-duration="1000">
                            <h2 className=' text-4xl lg:text-5xl font-bold text-start'>Travel opens your heart, broadens your mind, and fills your life with stories to tell.</h2>
                            <p>Welcome to TravelEase, where your travel dreams come true. Embark on extraordinary adventures, uncover hidden gems, and create lifelong memories. Start your journey with us today. Happy travels from our team</p>
                            <div className='flex gap-5 '>
                                <Link to='/places'>
                                    <button className='btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600'>See More</button>
                                </Link>
                                <Link to='/hotels'>
                                    <button className='btn btn-outline text-white border-0 border-b-4 border-r-4 bg-slate-900'>Book Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </motion.div>
    );
};

export default Banner;