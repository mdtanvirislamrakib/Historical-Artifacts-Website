import React from 'react';
import HeroSlider from '../Component/HeroSlider';
import FAQSection from '../Component/FAQSection';
import { useLoaderData } from 'react-router';
import FeaturedArtifacts from '../Component/FeaturedArtifacts';

const Home = () => {
    const featuredData = useLoaderData();

    return (
        <div>
            <HeroSlider></HeroSlider>
            <FeaturedArtifacts featuredData = {featuredData}></FeaturedArtifacts>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;