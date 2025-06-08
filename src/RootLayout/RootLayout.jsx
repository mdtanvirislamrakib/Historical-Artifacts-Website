import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const RootLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>

            <main className='min-h-screen'>
                <Outlet></Outlet>
            </main>

            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;