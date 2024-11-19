// import React, { useState } from "react";  
// import axios from "axios";  

// const SymptomCheckerPage = () => {  
//   const [symptoms, setSymptoms] = useState([]);  
//   const [diagnosis, setDiagnosis] = useState(null);  
//   const [precautions, setPrecautions] = useState([]);  
//   const [loading, setLoading] = useState(false);  
//   const [error, setError] = useState(null);  

//   const handleSymptomChange = (event) => {  
//     // Splitting symptoms by comma and trimming whitespace  
//     setSymptoms(event.target.value.split(",").map(symptom => symptom.trim()));  
//   };  

//   const handleSubmit = async () => {  
//     setLoading(true);  
//     setError(null);  
//     try {  
//       // Sending the symptoms to the server  
//       const response = await axios.post("http://localhost:5002/symptom-checker", {  
//         symptoms: symptoms,  
//       });  

//       console.log("Response Data:", response.data); // Debugging response data  

//       // Expecting the response to contain disease and precautions  
//       const { disease, precautions } = response.data;  

//       // Format diagnosis as either individual paragraphs or as a list  
//       const formattedDisease = Array.isArray(disease)  
//         ? disease.map((item, index) => <p key={index}>{item}</p>)  
//         : formatDiagnosisText(disease);  

//       // Format precautions; if none are provided default to a message  
//       const formattedPrecautions = Array.isArray(precautions) && precautions.length > 0   
//         ? precautions.map((item, index) => <p key={index}>{item}</p>)  
//         : ["No precautions provided."];  

//       // Update the state with the formatted diagnosis and precautions  
//       setDiagnosis(formattedDisease);  
//       setPrecautions(formattedPrecautions);  
//     } catch (err) {  
//       console.error("Error occurred:", err); // Debugging error  
//       setError("An error occurred while fetching the diagnosis.");  
//     } finally {  
//       setLoading(false); // Stop the loading state  
//     }  
//   };  

//   const formatDiagnosisText = (diagnosisText) => {  
//     // Formatting the diagnosis text to improve readability by splitting into paragraphs  
//     return diagnosisText  
//       .replace(/\n+/g, "\n\n") // Ensuring there are double newlines for paragraphs  
//       .split("\n\n")  
//       .map((paragraph, index) => <p key={index}>{paragraph}</p>);  
//   };  

//   return (  
//     <div>  
//       <h1>Symptom Checker</h1>  
//       <input  
//         type="text"  
//         placeholder="Enter symptoms separated by commas"  
//         value={symptoms.join(", ")}  
//         onChange={handleSymptomChange}  
//       />  
//       <button onClick={handleSubmit} disabled={loading}>  
//         {loading ? "Checking..." : "Submit"}  
//       </button>  

//       {/* Display error message if there is an error */}  
//       {error && <p style={{ color: "red" }}>{error}</p>}  

//       {/* Display the diagnosis if available */}  
//       {diagnosis && (  
//         <div>  
//           <h2>Possible Medical Conditions</h2>  
//           {diagnosis}  
//         </div>  
//       )}  

//       {/* Display the precautions if available */}  
//       {precautions.length > 0 && (  
//         <div>  
//           <h3>Recommended Next Steps</h3>  
//           {precautions}  
//         </div>  
//       )}  
//     </div>  
//   );  
// };  

// export default SymptomCheckerPage;

import React, { useState } from "react";  
import axios from "axios";  

const SymptomCheckerPage = () => {  
  const [symptoms, setSymptoms] = useState([]);  
  const [diagnosis, setDiagnosis] = useState(null);  
  const [precautions, setPrecautions] = useState([]);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  

  const handleSymptomChange = (event) => {  
    setSymptoms(event.target.value.split(",").map(symptom => symptom.trim()));  
  };  

  const handleSubmit = async () => {  
    setLoading(true);  
    setError(null);  
    try {  
      // Sending the symptoms to the server  
      const response = await axios.post("http://localhost:5002/symptom-checker", {  
        symptoms: symptoms,  
      });  

      console.log("Response Data:", response.data); // Debugging response data  

      // Expecting the response to contain disease and precautions  
      const { disease, precautions } = response.data;  

      // Sanitize the response data  
      const sanitizedDisease = sanitizeText(disease);  
      const sanitizedPrecautions = sanitizeText(precautions);  

      // Format diagnosis as either individual paragraphs or as a list  
      const formattedDisease = Array.isArray(sanitizedDisease)  
        ? sanitizedDisease.map((item, index) => <p key={index}>{item}</p>)  
        : formatDiagnosisText(sanitizedDisease);  

      // Format precautions; if none are provided default to a message  
      const formattedPrecautions = Array.isArray(sanitizedPrecautions) && sanitizedPrecautions.length > 0  
        ? sanitizedPrecautions.map((item, index) => <p key={index}>{item}</p>)  
        : ["No precautions provided."];  

      // Update the state with the formatted diagnosis and precautions  
      setDiagnosis(formattedDisease);  
      setPrecautions(formattedPrecautions);  
    } catch (err) {  
      console.error("Error occurred:", err); // Debugging error  
      setError("An error occurred while fetching the diagnosis.");  
    } finally {  
      setLoading(false); // Stop the loading state  
    }  
  };  

  const formatDiagnosisText = (diagnosisText) => {  
    // Formatting the diagnosis text to improve readability by splitting into paragraphs  
    return diagnosisText  
      .replace(/\n+/g, "\n\n") // Ensuring there are double newlines for paragraphs  
      .split("\n\n")  
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);  
  };  

  // Function to sanitize input text by removing LaTeX and other unwanted characters  
  const sanitizeText = (text) => {  
    if (Array.isArray(text)) {  
      return text.map(item => item.replace(/[\*\$\\\[\]{}]/g, '').trim()); // Remove unwanted symbols  
    }  
    return text ? text.replace(/[\*\$\\\[\]{}]/g, '').trim() : '';  
  };  

  return (  
    <div>  
      <h1>Symptom Checker</h1>  
      <input  
        type="text"  
        placeholder="Enter symptoms separated by commas"  
        value={symptoms.join(", ")}  
        onChange={handleSymptomChange}  
      />  
      <button onClick={handleSubmit} disabled={loading}>  
        {loading ? "Checking..." : "Submit"}  
      </button>  

      {/* Display error message if there is an error */}  
      {error && <p style={{ color: "red" }}>{error}</p>}  

      {/* Display the diagnosis if available */}  
      {diagnosis && (  
        <div>  
          <h2>Possible Medical Conditions</h2>  
          {diagnosis}  
        </div>  
      )}  

      {/* Display the precautions if available */}  
      {precautions.length > 0 && (  
        <div>  
          <h3>Recommended Next Steps</h3>  
          {precautions}  
        </div>  
      )}  
    </div>  
  );  
};  

export default SymptomCheckerPage;