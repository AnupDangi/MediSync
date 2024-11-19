import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar();
  };

  return (
    <div className="sidebar">
      <button onClick={() => handleNavigation('/menu')}>Home</button>
      <button onClick={() => handleNavigation('/login')}>Login Page</button>
      <button onClick={() => handleNavigation('/reminder')}>Reminder</button>
      <button onClick={() => handleNavigation('/history')}>History</button>
      <button onClick={() => handleNavigation('/drug-interaction')}>Drug Interaction</button>
      <button onClick={() => handleNavigation('/symptom-checker')}>Symptom Checker</button>
    </div>
  );
};

export default Sidebar;