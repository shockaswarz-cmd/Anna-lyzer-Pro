import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-background)' }}>
            <Sidebar />
            <main style={{
                marginLeft: '280px',
                flex: 1,
                padding: '2rem',
                overflowY: 'auto'
            }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
