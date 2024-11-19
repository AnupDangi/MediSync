// Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h3 className="navbar-title" onClick={() => navigate('/menu')}>Medi-Sync</h3>
        <div className="navbar-links">
          <button onClick={() => navigate('/reminder')} className="navbar-link">Reminder</button>
          <button onClick={() => navigate('/history')} className="navbar-link">History</button>
          <button onClick={() => navigate('/drug-interaction')} className="navbar-link">Drug Compatibility</button>
          <button onClick={() => navigate('/symptom-checker')} className="navbar-link">Symptoms Checker</button>
          <button onClick={() => navigate('/fill-details')} className="navbar-link">Medical Form</button>
        </div>
      </div>
      <div className="navbar-right" ref={dropdownRef}>
        <div className="user-menu">
          <FaUserCircle 
            className="user-icon" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="dropdown-item">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;