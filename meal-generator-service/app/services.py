import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

token = os.getenv("GITHUB_TOKEN")
endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1-mini"

client = OpenAI(
    base_url=endpoint,
    api_key=token,
)

from datetime import date
import json

def generate_meal_plan(prompt):
    structured_prompt = (
        f"{prompt}\n\n"
        "Please return the meal plan in the following JSON format:\n"
        "{\n"
        "  \"meals\": [\n"
        "    {\n"
        "      \"name\": \"Day 1 - Breakfast\",\n"
        "      \"time\": \"breakfast\",\n"
        "      \"items\": [\"Oatmeal\", \"Banana\", \"Almond Milk\"]\n"
        "    },\n"
        "    ... more meals ...\n"
        "  ],\n"
        "  \"totalCalories\": 2100,\n"
        "  \"totalProtein\": 150,\n"
        "  \"totalCarbs\": 250,\n"
        "  \"totalFats\": 70,\n"
        "  \"healthGoal\": \"muscle gain\",\n"
        "  \"servings\": 3,\n"
        f"  \"generatedDate\": \"{date.today().isoformat()}\"\n"
        "}"
    )

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful AI meal planner assistant."},
            {"role": "user", "content": structured_prompt}
        ]
    )

    ai_response = response.choices[0].message.content

    try:
        # Extract valid JSON from model's response
        json_start = ai_response.find("{")
        json_response = ai_response[json_start:]
        parsed = json.loads(json_response)
        return parsed
    except Exception as e:
        return {"error": "Failed to parse AI response", "details": str(e), "raw": ai_response}
