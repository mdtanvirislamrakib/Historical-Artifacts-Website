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

            <main className='min-h-screen pt-20' style={{
                background: 'linear-gradient(135deg, #18181b 0%, #23232b 50%, #18181b 100%)',
            }}>
                <Outlet></Outlet>
            </main>

            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;