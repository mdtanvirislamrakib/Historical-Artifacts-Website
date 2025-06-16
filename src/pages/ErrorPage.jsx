import React from 'react';
import errorLottie from "../assets/errorLottie.json"
import Lottie from 'react-lottie';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: errorLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <>
            {/* // dynamic title add */}
            <Helmet>
                <title>HistoriVault | Error</title>
            </Helmet>
            <div className='min-h-screen flex items-center justify-center flex-col'>
                <Lottie options={defaultOptions} height={400} width={400} />
                <button>
                    <Link to="/" class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                        <span class="relative">Go To Home</span>
                    </Link>
                </button>

            </div>


        </>

    );
};

export default ErrorPage;