import React, { useState } from 'react';
import '../styles/DrugInteractionPage.css';

const DrugInteractionPage = () => {
  const [drugs, setDrugs] = useState('');
  const [interactionResult, setInteractionResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split input into two drugs
    const drugList = drugs.split(',').map((drug) => drug.trim());

    if (drugList.length !== 2) {
      setError('Please enter exactly two drugs separated by a comma.');
      setInteractionResult(null);
      return;
    }

    const [drugA, drugB] = drugList;

    try {
      // Send POST request to the API
      const response = await fetch('http://127.0.0.1:5001/predict_risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ drug_a: drugA, drug_b: drugB }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch drug interaction data.');
      }

      const data = await response.json();

      // Update state with interaction result
      setInteractionResult(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setInteractionResult(null);
    }
  };

  return (
    <div className="interaction-page">
      <h2>Check Drug Compatibility</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter drug names separated by a comma (e.g., Aspirin, Ibuprofen)"
          value={drugs}
          onChange={(e) => setDrugs(e.target.value)}
          required
        />
        <button type="submit" className="interaction-button">
          Check Compatibility
        </button>
      </form>

      {/* Display errors */}
      {error && <p className="error-message">{error}</p>}

      {/* Display interaction result */}
      {interactionResult && (
        <div className="interaction-result">
          <h3>Interaction Details</h3>
          <p>
            <strong>Risk Level:</strong> {interactionResult.risk_level}
          </p>
          <p>
            <strong>Interaction Type:</strong> {interactionResult.interaction_info.interaction_type}
          </p>
          <p>
            <strong>Side Effects:</strong> {interactionResult.interaction_info.side_effects}
          </p>
          <p>
            <strong>Alternatives:</strong> {interactionResult.interaction_info.alternatives}
          </p>
        </div>
      )}
    </div>
  );
};

export default DrugInteractionPage;
