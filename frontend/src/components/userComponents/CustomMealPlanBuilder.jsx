import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

const availableMeals = [
  { id: 1, name: "Grilled Chicken Salad" },
  { id: 2, name: "Oatmeal with Berries" },
  { id: 3, name: "Quinoa Bowl" },
  { id: 4, name: "Avocado Toast" },
  { id: 5, name: "Smoothie Bowl" },
  { id: 6, name: "Egg White Omelette" },
  { id: 7, name: "Tofu Stir Fry" },
  { id: 8, name: "Paneer Wrap" },
];

const CustomMealPlanBuilder = () => {
  const [mealPlanName, setMealPlanName] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [selectedMeals, setSelectedMeals] = useState([]);

  const addMealToPlan = (meal) => {
    if (selectedMeals.length >= mealsPerDay) return;
    if (!selectedMeals.find((m) => m.id === meal.id)) {
      setSelectedMeals([...selectedMeals, meal]);
    }
  };

  const removeMealFromPlan = (id) => {
    setSelectedMeals(selectedMeals.filter((meal) => meal.id !== id));
  };

  const handleSubmit = () => {
    const customMealPlan = {
      mealPlanName,
      mealsPerDay,
      selectedMeals,
    };
    console.log("Final Custom Meal Plan:", customMealPlan);
    // Send to backend or save as needed
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Build Your Meal Plan
      </h2>

      {/* Meal Plan Name */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium text-gray-700">
            Meal Plan Name
          </span>
        </label>
        <input
          type="text"
          placeholder="e.g., High Protein Plan"
          value={mealPlanName}
          onChange={(e) => setMealPlanName(e.target.value)}
          className="input input-bordered w-full rounded-xl"
        />
      </div>

      {/* Meals Per Day Selector */}
      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text font-medium text-gray-700">
            Number of Meals Per Day
          </span>
        </label>
        <select
          value={mealsPerDay}
          onChange={(e) => setMealsPerDay(parseInt(e.target.value))}
          className="select select-bordered rounded-xl w-48"
        >
          {[2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num} meals
            </option>
          ))}
        </select>
      </div>

      {/* Meal List */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Browse Meals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableMeals.map((meal) => (
            <div
              key={meal.id}
              className="border border-gray-300 p-4 rounded-xl flex justify-between items-center"
            >
              <span>{meal.name}</span>
              <button
                onClick={() => addMealToPlan(meal)}
                disabled={selectedMeals.length >= mealsPerDay}
                className="btn btn-sm btn-success text-white"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Meals */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Selected Meals</h3>
        {selectedMeals.length === 0 ? (
          <p className="text-gray-500">No meals selected yet.</p>
        ) : (
          <ul className="space-y-2">
            {selectedMeals.map((meal, index) => (
              <li
                key={meal.id}
                className="bg-teal-50 border border-teal-200 p-3 rounded-xl flex justify-between items-center"
              >
                <span>
                  <strong>Meal {index + 1}:</strong> {meal.name}
                </span>
                <button
                  onClick={() => removeMealFromPlan(meal.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={selectedMeals.length !== mealsPerDay}
        className="btn btn-accent w-full text-white text-lg rounded-xl hover:scale-105 transition-all"
      >
        Save Meal Plan
      </button>
    </div>
  );
};

export default CustomMealPlanBuilder;
