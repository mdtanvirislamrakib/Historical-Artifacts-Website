import React from 'react';
import HeroSlider from '../Component/HeroSlider';
import FAQSection from '../Component/FAQSection';
import { useLoaderData } from 'react-router';
import FeaturedArtifacts from '../Component/FeaturedArtifacts';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    const featuredData = useLoaderData();

    return (
        <div>
            // dynamic title add
            <Helmet>
                <title>HistoriVault | Home</title>
            </Helmet>
            <HeroSlider></HeroSlider>
            <FeaturedArtifacts featuredData={featuredData}></FeaturedArtifacts>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;