import logging
from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import google.generativeai as genai
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/symptom-checker": {"origins": "http://localhost:3000"}})

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["Hackathon"]
disease_collection = db["disease_data"]

# Configure Gemini API key
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

@app.route('/symptom-checker', methods=['POST'])
def diagnose():
    try:
        # Get the symptoms from the request
        symptoms = request.json.get('symptoms')
        if not symptoms:
            return jsonify({"error": "No symptoms provided."}), 400

        # Step 1: First, check MongoDB for diseases that match a high percentage of the provided symptoms
        matching_diseases = find_matching_diseases(symptoms)
        
        if matching_diseases:
            return jsonify({"matching_diseases": matching_diseases})

        # Step 2: If no matching diseases, call Gemini API for diagnosis
        prompt = create_prompt(symptoms)
        gemini_diagnosis = analyze_symptoms_with_gemini(prompt)
        
        return jsonify(gemini_diagnosis)

    except Exception as e:
        logging.error(f"Error during symptom check: {str(e)}")
        return jsonify({"error": "An error occurred while processing the symptoms."}), 500


def find_matching_diseases(symptoms):
    # Query MongoDB for diseases that match a certain percentage of the provided symptoms
    symptoms_set = set(symptoms)
    matching_diseases = []

    results = disease_collection.find()  # Find all diseases in the collection

    for doc in results:
        disease_symptoms_set = set(doc["symptoms"])
        
        # Calculate the number of matching symptoms between the input and disease symptoms
        matching_symptoms = symptoms_set.intersection(disease_symptoms_set)
        
        # Check if at least 70% of symptoms match
        if len(matching_symptoms) / len(disease_symptoms_set) >= 0.7:
            matching_diseases.append(doc["disease"])
    
    return matching_diseases if matching_diseases else None


def create_prompt(symptoms):
    # Create the prompt based on the symptoms
    formatted_symptoms = ', '.join(symptoms)
    
    prompt = f"""
    Based on the following symptoms: {formatted_symptoms}, please provide in very short and accurate around:
    1. Possible medical conditions.
    2. Risk levels (high, moderate, low).
    3. Recommended next steps for each condition.
    """
    return prompt


def analyze_symptoms_with_gemini(prompt):
    # Use Gemini API for diagnosis
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    
    # Extract diagnosis from the Gemini API response
    diagnosis_text = response.text

    if not diagnosis_text:
        # Fallback message if no response is received
        diagnosis_text = "Unable to get a proper diagnosis from Gemini API. Please consult a healthcare provider."
    
    return {
        "disease": diagnosis_text,
        "precautions": ["Consult a doctor immediately if symptoms worsen."]
    }

if __name__ == '__main__':
    app.run(debug=True, port=5002)
