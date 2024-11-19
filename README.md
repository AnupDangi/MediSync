# MediSync  

## Overview  

**MediSync** is an AI-powered drug interaction checker application designed to help users ensure the safe use of multiple medications by identifying and analyzing potential drug interactions. With the increasing complexity of medical prescriptions, particularly in patients with chronic conditions or those taking multiple drugs, understanding how medications interact is crucial to avoid adverse effects.  

## Project Goals  

This project aims to build an innovative, user-friendly solution that goes beyond standard drug interaction databases by incorporating:  

- **AI-driven interaction predictions**  
- **Health tracking**  

## How It Works  

Leveraging Artificial Intelligence (AI), the MediSync app utilizes a machine learning model trained on a large dataset of known drug interactions, side effects, and pharmacological data. The AI system predicts interactions for newer or lesser-known medications, providing a safeguard even when the drugs are not fully documented in standard databases. This enables the app to offer dynamic interaction warnings and improve the accuracy of the interaction detection process.  

## Features  

- **Drug Interaction Analysis**: Identify potential interactions between multiple medications.  
- **AI Predictions**: Get predictions for newer or lesser-known drugs.  
- **Health Tracking**: Monitor health metrics related to medication use.  

## Technologies Used  

- **Frontend**: React, CSS, JavaScript  
- **Backend**: Python Flask for machine learning model integration  
- **Database**: MongoDB for storing user data and medication information  
- **User Authentication**: Node.js for managing user authentication and database queries  
- **AI Model**: H2O.ai for building the machine learning model, which utilizes various auto-optimizing and selection algorithms based on the input data  
- **Data Management**: CSV files stored and queried from the database  

## Installation  

To set up the MediSync application locally, follow these steps:  

1. Clone the repository:  
   ```bash  
      git clone https://github.com/yourusername/MediSync.git  
      cd MediSync
   ```
2. Install the necessary dependencies for both the frontend and backend(eg dotenv,express,react-router-dom and more check out the imports):

For the frontend:

```bash
    cd src 
    npm install  
```
For the backend:
```bash
cd backend
pip install -r requirements.txt  
```

3.  Set up the MongoDB database and ensure that it's running.

4.  Start the backend server:
```bash
    python server.py  
```

5. For ML model also as it using flask run the server using virtual environment.

```bash
    (venv)  python symptom_checker.py  
```

```bash
(venv)  python compactibility_checker.py  
```

6. Start the frontend Server 
```bash
  npm start
```



## Contributing

Contributions are always welcome.
Feel free to use this project and modify based on your requirement.


## License

This project is licensed under the MIT License - see the LICENSE file for details
