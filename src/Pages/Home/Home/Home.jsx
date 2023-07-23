import React from 'react';
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import SliderPlace from '../Slider/SliderPlace';
import PopularPlaces from '../PopularPlaces/PloularPlaces';
import PopularHotels from '../PopularHotels/PopularHotels';
import Message from '../Message/Message';
import Contact from '../Contact/Contact';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <Helmet>
                <title>TravelEase | Home</title>
            </Helmet>
            <Banner></Banner>
            <SliderPlace></SliderPlace>
            <Message></Message>
            <PopularPlaces></PopularPlaces>
            <Contact></Contact>
            <PopularHotels></PopularHotels>
        </motion.div>
    );
};

export default Home;