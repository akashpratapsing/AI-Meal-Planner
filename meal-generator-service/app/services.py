import os
import json
from datetime import date
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

# Initialize Gemini Client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_meal_plan(prompt):
    from datetime import date

    structured_prompt = (
        f"{prompt}\n\n"
        "Please return the meal plan in the following JSON format:\n"
        "{\n"
        "  \"meals\": [\n"
        "    {\n"
        "      \"name\": \"Day 1 - Breakfast\",\n"
        "      \"time\": \"breakfast\",\n"
        "      \"items\": [\"Oatmeal\", \"Banana\", \"Almond Milk\"],\n"
        "      \"calories\": 550,\n"
        "      \"protein\": 25,\n"
        "      \"carbs\": 80,\n"
        "      \"fats\": 10\n"
        "    }\n"
        "    // ... more meals ...\n"
        "  ],\n"
        "  \"healthGoal\": \"muscle gain\",\n"
        f"  \"generatedDate\": \"{date.today().isoformat()}\"\n"
        "}"
    )



    # Generate content
    response = client.models.generate_content(
        model="gemini-2.0-flash",  
        contents=[structured_prompt],
        config=types.GenerateContentConfig(
            temperature=0.7,
            system_instruction="You are a helpful AI meal planner assistant."
        )
    )

    ai_response = response.text
    print("=== RAW GEMINI RESPONSE ===")
    print(ai_response)

    # Try extracting JSON
    try:
        if ai_response.startswith("```json"):
            ai_response = ai_response.replace("```json", "").replace("```", "").strip()

        json_start = ai_response.find("{")
        json_response = ai_response[json_start:]
        parsed = json.loads(json_response)
        return parsed
    except Exception as e:
        return {
            "error": "Failed to parse Gemini response",
            "details": str(e),
            "raw": ai_response
        }
