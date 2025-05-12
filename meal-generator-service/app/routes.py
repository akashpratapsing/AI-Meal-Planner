from flask import Blueprint, request, jsonify
from .services import generate_meal_plan

main = Blueprint('main', __name__)

@main.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({"error": "Prompt is missing"}), 400

    meal_plan = generate_meal_plan(prompt)
    return jsonify(meal_plan)

