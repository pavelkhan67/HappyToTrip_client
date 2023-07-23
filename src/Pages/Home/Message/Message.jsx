import React from 'react';
import img1 from '../../../assets/home/img2.jpg'

const Message = () => {
    return (
        <div className="hero h-[60vh] lg:h-[80vh] my-10" style={{ backgroundImage: `url(${img1})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center bg-white w-9/12">
                <div className="max-w-md py-10">
                    <h1 className="mb-5 text-4xl font-bold">TravelEase</h1>
                    <p className="mb-5">Welcome to TravelEase! Your gateway to happiness through travel. Get ready to wander, explore, and create cherished memories. Let's make every trip a joyful adventure. Welcome aboard and enjoy the ride.Pack your bags and join the happiness revolution at TravelEase!</p>
                </div>
            </div>
        </div>
    );
};

export default Message;