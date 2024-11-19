import React, { useState } from 'react';
import '../styles/ReminderPage.css';

const ReminderPage = () => {
  const [reminder, setReminder] = useState({
    medicine: '',
    time: '',
    dosage: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminder({ ...reminder, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you’d typically save the reminder to a backend server or local storage
    console.log("Reminder set:", reminder);
  };

  return (
    <div className="reminder-page">
      <h2>Set Medicine Reminder</h2>
      <form onSubmit={handleSubmit}>
        <input name="medicine" placeholder="Enter the medicine name" onChange={handleChange} required />
        <input name="time" placeholder="Enter the time to be taken" onChange={handleChange} required />
        <input name="dosage" placeholder="Enter the dosage" onChange={handleChange} required />
        <input name="duration" placeholder="Enter the duration" onChange={handleChange} required />
        <button type="submit" className="reminder-button">Set Reminder</button>
      </form>
    </div>
  );
};

export default ReminderPage;