// App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import MenuPage from './components/MenuPage';
import ReminderPage from './components/ReminderPage';
import HistoryPage from './components/HistoryPage';
import DrugInteractionPage from './components/DrugInteractionPage';
import SymptomCheckerPage from './components/SymptomCheckerPage';
import MedicalForm from './components/MedicalForm';

// import './App.css'
function App() {
  const location = useLocation();

  // Paths where the Navbar should be hidden
  const noNavbarPaths = ['/', '/login','/menu','/signup'];

  return (
    <div>
      {/* Conditionally render Navbar based on the current path */}
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/fill-details" element={<MedicalForm />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reminder" element={<ReminderPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/drug-interaction" element={<DrugInteractionPage />} />
        <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
      </Routes>

    </div>
  );
}

export default App;
