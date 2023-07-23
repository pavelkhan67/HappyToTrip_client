import React from 'react';
import img from "../../assets/logo2.png"
import { FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <div className="footer bg-slate-600 p-10 text-neutral-content">
                <div className='text-white'>
                    <img className='w-44 rounded-lg' src={img} alt="" />
                    <p>Your Ultimate Travel Companion <br />

                        Explore. Discover. Wander. <br />

                        <span className='text-lg italic font-semibold'>"Adventure Awaits You"</span></p>
                </div>
                <div className='text-white'>
                    <span className="font-bold text-white text-lg">SOCIAL</span>
                    <div className="grid grid-flow-col gap-4">
                        <a href='https://github.com/pavelkhan67'><FaGithub className='text-xl'></FaGithub></a>
                        <a href='https://www.youtube.com/channel/UCbnTDKDzHHERma1hq5fIJ6Q'><FaYoutube className='text-xl'></FaYoutube> </a>
                        <a href='https://www.facebook.com/pavel.mdpavelkhan/'><FaFacebook className='text-xl'></FaFacebook></a>
                    </div>
                    <p>Location: Dhaka, Bangladesh</p>
                    <p>Contact Us: </p>
                    <p>Email: paveltopu67@gmail.com</p>
                    <p>Call: +88 01634305859</p>

                </div>
            </div>
            <div className="footer footer-center p-4 bg-slate-900 text-white">
                <div>
                    <p>© 2023 TravelEase. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;