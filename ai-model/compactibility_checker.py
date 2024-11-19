import h2o
from h2o.automl import H2OAutoML
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize H2O
h2o.init()

# Load H2O model
model = h2o.load_model(r"/home/APPLE/Data/Research/Hackathon/QuantAMaze/Project/test/medisync/ai-model/drug_interaction_aml_model/StackedEnsemble_BestOfFamily_1_AutoML_1_20241115_120503")

# Load dataset for validation
DATASET_PATH = r"/home/APPLE/Data/Research/Hackathon/QuantAMaze/Project/test/medisync/ai-model/dataset/drug_interactions_dataset.csv"
valid_drugs = pd.read_csv(DATASET_PATH)
valid_drug_a = set(valid_drugs['Drug A'].unique())
valid_drug_b = set(valid_drugs['Drug B'].unique())

@app.route('/test', methods=['POST'])
def test():
    return jsonify({"message": "Server is running!"})

def validate_input(drug_a, drug_b):
    """
    Validates if either order of the drugs exists in the dataset.
    """
    if drug_a not in valid_drug_a and drug_a not in valid_drug_b:
        return False, f"Drug A '{drug_a}' is not recognized."
    if drug_b not in valid_drug_b and drug_b not in valid_drug_a:
        return False, f"Drug B '{drug_b}' is not recognized."
    return True, ""

def get_interaction_info(drug_a, drug_b):
    """
    Checks for interaction details in both (Drug A, Drug B) and (Drug B, Drug A) orders.
    """
    # Check for the original order
    match = valid_drugs[(valid_drugs['Drug A'] == drug_a) & (valid_drugs['Drug B'] == drug_b)]
    if not match.empty:
        interaction_type = match.iloc[0]['Interaction Type']
        side_effects = match.iloc[0]['Side Effects']
        alternatives = match.iloc[0]['Alternatives']
        return {
            "interaction_type": interaction_type,
            "side_effects": side_effects,
            "alternatives": alternatives
        }

    # Check for the swapped order
    match = valid_drugs[(valid_drugs['Drug A'] == drug_b) & (valid_drugs['Drug B'] == drug_a)]
    if not match.empty:
        interaction_type = match.iloc[0]['Interaction Type']
        side_effects = match.iloc[0]['Side Effects']
        alternatives = match.iloc[0]['Alternatives']
        return {
            "interaction_type": interaction_type,
            "side_effects": side_effects,
            "alternatives": alternatives
        }

    # If no interaction is found
    return {
        "interaction_type": "Unknown",
        "side_effects": "Unknown",
        "alternatives": "Unknown"
    }

@app.route('/predict_risk', methods=['POST'])
def predict_risk():
    content = request.get_json()
    drug_a = content.get('drug_a')
    drug_b = content.get('drug_b')

    if not drug_a or not drug_b:
        return jsonify({"error": "Both 'drug_a' and 'drug_b' are required."}), 400

    is_valid, validation_message = validate_input(drug_a, drug_b)
    if not is_valid:
        return jsonify({"error": validation_message}), 400

    input_data = h2o.H2OFrame([{"Drug A": drug_a, "Drug B": drug_b}])
    prediction = model.predict(input_data)
    interaction_info = get_interaction_info(drug_a, drug_b)

    return jsonify({
        "risk_level": prediction.as_data_frame().iloc[0, 0],
        "interaction_info": interaction_info
    })

if __name__ == "__main__":
    app.run(debug=True, port=5001)
