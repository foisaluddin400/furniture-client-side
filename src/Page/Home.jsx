import React from 'react';
import Hero from '../Components/Hero';
import Brows from '../Components/home/Brows';
import OurProduct from '../Components/home/OurProduct';
import TrendingProduct from '../Components/home/TrendingProduct';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Brows></Brows>
            <OurProduct></OurProduct>
            <TrendingProduct></TrendingProduct>
        </div>
    );
};

export default Home;