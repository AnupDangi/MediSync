import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css';
const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', // Email field
    password: '', // Password field
    confirmPassword: '', // Confirm password field
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Passwords must match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
  
      // Log raw response text for debugging
      const rawData = await response.text();
      console.log('Raw server response:', rawData); // Log the raw response
  
      // Attempt to parse the response as JSON
      let jsonData;
      try {
        jsonData = JSON.parse(rawData); // Try parsing it as JSON
      } catch (err) {
        console.error('Failed to parse response:', err);
        setError('Server response is not valid JSON.');
        return;
      }
  
      if (response.status === 201) {
        alert('Signup successful! You can now log in.');
        navigate('/login');
      } else {
        setError(jsonData.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };
  
  

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="confirmPassword" 
          type="password" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          required 
        />
        {error && <p className="error-message">{error}</p>} {/* Display error message */}<br></br>
        <button type="submit" className="signup-button">Sign Up</button>
        <h5>Already Signed Up? <a href='/login'>Login</a></h5>
      </form>
      <footer>Contact for more details - 98411234ani63</footer>
    </div>
  );
};

export default SignupPage;