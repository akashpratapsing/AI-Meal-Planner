import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const dummyMeals = {
  1: {
    image: "https://source.unsplash.com/800x400/?breakfast",
    name: "Healthy Breakfast",
    time: "Breakfast",
    items: ["Oats", "Fruits", "Nuts"],
    calories: 320,
    protein: 12,
    carbs: 45,
    fats: 10,
  },
  2: {
    image: "https://source.unsplash.com/800x400/?lunch",
    name: "Nutritious Lunch",
    time: "Lunch",
    items: ["Grilled Chicken", "Salad", "Quinoa"],
    calories: 520,
    protein: 40,
    carbs: 35,
    fats: 18,
  },
  3: {
    image: "https://source.unsplash.com/800x400/?healthy,meal",
    name: "Healthy Recipes",
    time: "Dinner",
    items: ["Brown Rice", "Veggies", "Paneer"],
    calories: 460,
    protein: 28,
    carbs: 50,
    fats: 12,
  },
};

const MealCard = () => {
  const { mealId } = useParams();
  const navigate = useNavigate();
  const id = Number(mealId);
  const meal = dummyMeals[id];

  const mealIds = Object.keys(dummyMeals).map(Number).sort((a, b) => a - b);
  const currentIndex = mealIds.indexOf(id);

  const prevId = mealIds[currentIndex - 1];
  const nextId = mealIds[currentIndex + 1];

  if (!meal)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#d2f0f8] text-xl font-semibold text-gray-700">
        Meal not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#d2f0f8] flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden w-full max-w-3xl">
        {/* Meal Image */}
        <img
          src={meal.image}
          alt={meal.name || "Meal Image"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback-meal.jpg";
          }}
          className="w-full h-64 sm:h-80 object-cover"
        />

        {/* Meal Details */}
        <div className="p-6 space-y-6">
          {/* Top Buttons */}
          <div className="flex justify-between mb-4">
            <button
              type="button"
              aria-label="Go back"
              className="btn btn-sm btn-outline"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <div className="space-x-2">
              {prevId && (
                <button
                  className="btn btn-sm btn-neutral"
                  onClick={() => navigate(`/meal/${prevId}`)}
                >
                  ← Previous
                </button>
              )}
              {nextId && (
                <button
                  className="btn btn-sm btn-neutral"
                  onClick={() => navigate(`/meal/${nextId}`)}
                >
                  Next →
                </button>
              )}
            </div>
          </div>

          {/* Title + Time */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{meal.name}</h2>
            <span className="badge badge-primary text-sm px-4 py-2">
              {meal.time}
            </span>
          </div>

          {/* Ingredients */}
          {meal.items?.length > 0 && (
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Ingredients
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {meal.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Nutrition Info */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Nutrition Info
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-100 rounded-xl p-4">
                <p className="text-lg font-bold text-blue-800">
                  {meal.calories} kcal
                </p>
                <p className="text-sm text-gray-600">Calories</p>
              </div>
              <div className="bg-green-100 rounded-xl p-4">
                <p className="text-lg font-bold text-green-800">
                  {meal.protein} g
                </p>
                <p className="text-sm text-gray-600">Protein</p>
              </div>
              <div className="bg-yellow-100 rounded-xl p-4">
                <p className="text-lg font-bold text-yellow-800">
                  {meal.carbs} g
                </p>
                <p className="text-sm text-gray-600">Carbs</p>
              </div>
              <div className="bg-pink-100 rounded-xl p-4">
                <p className="text-lg font-bold text-pink-800">
                  {meal.fats} g
                </p>
                <p className="text-sm text-gray-600">Fats</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
