import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, PieChart, Settings, FileText } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
        { icon: <PlusCircle size={20} />, label: 'New Deal', path: '/new-deal' },
        { icon: <PieChart size={20} />, label: 'Analysis', path: '/analysis' },
        { icon: <FileText size={20} />, label: 'Saved Packs', path: '/packs' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">AL</div>
                <h2 className="logo-text">Anna Lyzer</h2>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="avatar">FP</div>
                    <div className="user-details">
                        <span className="user-name">French Polo</span>
                        <span className="user-role">Pro Sourcer</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
