import React, { useState } from 'react';
import '../styles/Medicalform.css';// Assuming you will place the CSS here

const MedicalForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    geneticIssue: '',
    allergies: '',
    bloodType: '',
    pastSurgeries: '',
    currentMedications: '',
    underAnyCondition: '',
    smokingStatus: '',
    alcoholConsumption: '',
    familyMedicalHistory: '',
    emergencyContact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here, you can handle form submission, e.g., sending data to an API
  };

  return (
    <div className="history-page">
      <h2>Medical Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="geneticIssue">Genetic Issues:</label>
          <input
            type="text"
            id="geneticIssue"
            name="geneticIssue"
            value={formData.geneticIssue}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="allergies">Allergies:</label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="bloodType">Blood Type:</label>
          <input
            type="text"
            id="bloodType"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="pastSurgeries">Past Surgeries:</label>
          <input
            type="text"
            id="pastSurgeries"
            name="pastSurgeries"
            value={formData.pastSurgeries}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="currentMedications">Current Medications:</label>
          <input
            type="text"
            id="currentMedications"
            name="currentMedications"
            value={formData.currentMedications}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="underAnyCondition">Under Any Condition (e.g., diabetes, hypertension):</label>
          <input
            type="text"
            id="underAnyCondition"
            name="underAnyCondition"
            value={formData.underAnyCondition}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="smokingStatus">Smoking Status:</label>
          <input
            type="text"
            id="smokingStatus"
            name="smokingStatus"
            value={formData.smokingStatus}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="alcoholConsumption">Alcohol Consumption:</label>
          <input
            type="text"
            id="alcoholConsumption"
            name="alcoholConsumption"
            value={formData.alcoholConsumption}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="familyMedicalHistory">Family Medical History:</label>
          <input
            type="text"
            id="familyMedicalHistory"
            name="familyMedicalHistory"
            value={formData.familyMedicalHistory}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="emergencyContact">Emergency Contact (Name & Phone):</label>
          <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MedicalForm;