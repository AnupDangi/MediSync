from pymongo import MongoClient
import pandas as pd

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/Hackathon")

db = client["Hackathon"]
disease_collection = db["disease_data"]

# Load your dataset
file_path = "/home/APPLE/Data/Research/Hackathon/QuantAMaze/Project/test/medisync/ai-model/dataset/merged_symptom_precaution_data.csv"  # Path to your dataset
symptom_data = pd.read_csv(file_path)

# Define a function to format and insert each row into MongoDB
def insert_data_into_mongodb(df):
    for _, row in df.iterrows():
        # Extract symptoms from columns, ignoring NaN values
        symptoms = [row[col] for col in df.columns if col.startswith('symptom_') and pd.notnull(row[col])]
        
        # Extract precautions, ignoring NaN values
        precautions = [row[col] for col in df.columns if col.startswith('precaution_') and pd.notnull(row[col])]
        
        # Prepare the document to insert
        disease_document = {
            "disease": row["disease"],
            "symptoms": symptoms,
            "precautions": precautions
        }
        
        # Insert into MongoDB
        disease_collection.insert_one(disease_document)

# Call the function to insert data
insert_data_into_mongodb(symptom_data)

print("Data inserted into MongoDB successfully.")