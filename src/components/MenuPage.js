import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/MenuPage.css';

const MenuPage = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Hide navbar on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <div className="menu-page">
      {/* Navbar */}
      <div className="navbar">
        <Navbar />
        <div className="navbar-right">
          <Link to="/login" className="navbar-title">
            Logout
          </Link>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}

      {/* Background Image */}
      <div style={{ zIndex: 1, padding: '20px', marginTop: '20px' }}>
      <h1 className="color-animation">Welcome to Medi-Sync</h1>
      </div>
      
      <div className="background-image"></div>
    </div>
     
  );
};

export default MenuPage;
