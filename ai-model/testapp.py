from dotenv import load_dotenv
import google.generativeai as genai
import os
# Load the environment variables from .env file
load_dotenv()

# Now you can access the environment variable just like before
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
print('hello')
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Top Cricker of nepal.")
print(response.text)