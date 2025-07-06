import React, { useState } from "react";
import {
  ChevronDown,
  Plus,
  X,
  Target,
  User,
  Clock,
  DollarSign,
  Globe,
  Heart,
} from "lucide-react";
import { Form } from "react-router-dom";

const MealPlanForm = () => {
  const [formData, setFormData] = useState({
    targetCalories: "",
    targetProtein: "",
    targetCarbs: "",
    targetFats: "",
    dietType: "",
    allergies: [],
    restrictions: [],
    mealsPerDay: "3",
    mealTimes: [],
    age: "",
    sex: "",
    weight: "",
    height: "",
    healthGoal: "",
    activityLevel: "",
    maxPrepTime: "",
    budget: "",
    availableIngredients: [],
    wantDiverseMeals: false,
    preferredCuisines: [],
  });

  const [newAllergy, setNewAllergy] = useState("");
  const [newRestriction, setNewRestriction] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  const dietTypes = [
    "All Meals",
    "Vegetarian",
    "Vegan",
    "Keto",
    "Paleo",
    "Mediterranean",
    "Low Carb",
    "Gluten-Free",
  ];
  const healthGoals = [
    "Weight Loss",
    "Muscle Gain",
    "Maintain Weight",
    "Improve Health",
    "Athletic Performance",
  ];
  const activityLevels = [
    "Sedentary",
    "Lightly Active",
    "Moderately Active",
    "Very Active",
    "Extremely Active",
  ];
  const cuisineTypes = [
    "Italian",
    "Mexican",
    "Asian",
    "Mediterranean",
    "American",
    "Indian",
    "Thai",
    "Greek",
    "Japanese",
    "French",
  ];
  const mealTimeOptions = [
    "Breakfast",
    "Mid-Morning Snack",
    "Lunch",
    "Afternoon Snack",
    "Dinner",
    "Evening Snack",
  ];

  const addToList = (listName, value, setter) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [listName]: [...prev[listName], value.trim()],
      }));
      setter("");
    }
  };

  const removeFromList = (listName, index) => {
    setFormData((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleMealTime = (mealTime) => {
    setFormData((prev) => ({
      ...prev,
      mealTimes: prev.mealTimes.includes(mealTime)
        ? prev.mealTimes.filter((time) => time !== mealTime)
        : [...prev.mealTimes, mealTime],
    }));
  };

  const toggleCuisine = (cuisine) => {
    setFormData((prev) => ({
      ...prev,
      preferredCuisines: prev.preferredCuisines.includes(cuisine)
        ? prev.preferredCuisines.filter((c) => c !== cuisine)
        : [...prev.preferredCuisines, cuisine],
    }));
  };

  const handleSubmit = () => {
    console.log("Meal Plan Request:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4">
      <div className="max-w-4xl mx-auto">
        <form>
          {/* Header */}
          <div className="card bg-white rounded-2xl shadow-xl mb-8">
            <div className="card-body p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    Create Your Meal Plan
                  </h1>
                  <p className="text-sm text-gray-600">
                    Customize your perfect nutrition plan
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-black">
            {/* Nutritional Goals */}
            <div className="card bg-white rounded-2xl shadow-xl p-6">
              <div className="card-body p-0">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-teal-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Nutritional Goals
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Target Calories
                      </span>
                    </label>
                    <input
                      type="number"
                      value={formData.targetCalories}
                      onChange={(e) =>
                        handleInputChange("targetCalories", e.target.value)
                      }
                      placeholder="e.g., 2000"
                      className="input input-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Protein (g)
                      </span>
                    </label>
                    <input
                      type="number"
                      value={formData.targetProtein}
                      onChange={(e) =>
                        handleInputChange("targetProtein", e.target.value)
                      }
                      placeholder="e.g., 150"
                      className="input input-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Carbs (g)
                      </span>
                    </label>
                    <input
                      type="number"
                      value={formData.targetCarbs}
                      onChange={(e) =>
                        handleInputChange("targetCarbs", e.target.value)
                      }
                      placeholder="e.g., 250"
                      className="input input-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">Fats (g)</span>
                    </label>
                    <input
                      type="number"
                      value={formData.targetFats}
                      onChange={(e) =>
                        handleInputChange("targetFats", e.target.value)
                      }
                      placeholder="e.g., 80"
                      className="input input-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="card bg-white rounded-2xl shadow-xl p-6">
              <div className="card-body p-0">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-teal-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Personal Profile
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">Age</span>
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder="e.g., 30"
                      className="input input-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">Sex</span>
                    </label>
                    <select
                      value={formData.sex}
                      onChange={(e) => handleInputChange("sex", e.target.value)}
                      className="select select-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    >
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Weight (kg)
                      </span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) =>
                        handleInputChange("weight", e.target.value)
                      }
                      placeholder="e.g., 70.5"
                      className="input input-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Height (cm)
                      </span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.height}
                      onChange={(e) =>
                        handleInputChange("height", e.target.value)
                      }
                      placeholder="e.g., 175"
                      className="input input-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Health Goal
                      </span>
                    </label>
                    <select
                      value={formData.healthGoal}
                      onChange={(e) =>
                        handleInputChange("healthGoal", e.target.value)
                      }
                      className="select select-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    >
                      <option value="">Select Goal</option>
                      {healthGoals.map((goal) => (
                        <option key={goal} value={goal}>
                          {goal}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Activity Level
                      </span>
                    </label>
                    <select
                      value={formData.activityLevel}
                      onChange={(e) =>
                        handleInputChange("activityLevel", e.target.value)
                      }
                      className="select select-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    >
                      <option value="">Select Activity Level</option>
                      {activityLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Dietary Preferences */}
            <div className="card bg-white rounded-2xl shadow-xl p-6">
              <div className="card-body p-0">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-6 h-6 text-teal-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Dietary Preferences
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Diet Type Buttons */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Diet Type
                      </span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {dietTypes.map((diet) => (
                        <button
                          key={diet}
                          type="button"
                          onClick={() => handleInputChange("dietType", diet)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.dietType === diet
                              ? "border-teal-500 bg-teal-50 text-teal-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {diet}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Allergies Input */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-700">
                          Allergies
                        </span>
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={newAllergy}
                          onChange={(e) => setNewAllergy(e.target.value)}
                          placeholder="Add allergy"
                          className="input input-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            addToList("allergies", newAllergy, setNewAllergy)
                          }
                          className="btn bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-3"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.allergies.map((allergy, index) => (
                          <span
                            key={index}
                            className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                          >
                            {allergy}
                            <button
                              type="button"
                              onClick={() => removeFromList("allergies", index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Restrictions Input */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-700">
                          Restrictions
                        </span>
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={newRestriction}
                          onChange={(e) => setNewRestriction(e.target.value)}
                          placeholder="Add restriction"
                          className="input input-bordered w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            addToList(
                              "restrictions",
                              newRestriction,
                              setNewRestriction
                            )
                          }
                          className="btn bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-3"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.restrictions.map((restriction, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                          >
                            {restriction}
                            <button
                              type="button"
                              onClick={() =>
                                removeFromList("restrictions", index)
                              }
                              className="text-orange-600 hover:text-orange-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meal Structure */}
            <div className="card bg-white rounded-2xl shadow-xl p-6">
              <div className="card-body p-0">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-teal-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Meal Structure
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Meals Per Day */}
                  <div className="form-control max-w-xs">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Meals Per Day
                      </span>
                    </label>
                    <select
                      value={formData.mealsPerDay}
                      onChange={(e) =>
                        handleInputChange("mealsPerDay", e.target.value)
                      }
                      className="select select-bordered rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    >
                      <option value="3">3 meals</option>
                      <option value="4">4 meals</option>
                      <option value="5">5 meals</option>
                      <option value="6">6 meals</option>
                    </select>
                  </div>

                  {/* Preferred Meal Times */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Preferred Meal Times
                      </span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {mealTimeOptions.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => toggleMealTime(time)}
                          className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                            formData.mealTimes.includes(time)
                              ? "border-teal-500 bg-teal-50 text-teal-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Constraints */}
            <div className="card bg-white rounded-2xl shadow-xl p-6">
              <div className="card-body p-0">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-6 h-6 text-teal-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Practical Constraints
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Max Prep Time */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Max Prep Time (minutes)
                      </span>
                    </label>
                    <input
                      type="number"
                      value={formData.maxPrepTime}
                      onChange={(e) =>
                        handleInputChange("maxPrepTime", e.target.value)
                      }
                      placeholder="e.g., 45"
                      className="input input-bordered rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>

                  {/* Budget */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Budget ($ per week)
                      </span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange("budget", e.target.value)
                      }
                      placeholder="e.g., 100"
                      className="input input-bordered rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>

                  {/* Available Ingredients */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Available Ingredients
                      </span>
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                        placeholder="Add ingredient"
                        className="input input-bordered flex-1 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          addToList(
                            "availableIngredients",
                            newIngredient,
                            setNewIngredient
                          )
                        }
                        className="btn bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-3"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formData.availableIngredients.map(
                        (ingredient, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                          >
                            {ingredient}
                            <button
                              type="button"
                              onClick={() =>
                                removeFromList("availableIngredients", index)
                              }
                              className="text-green-600 hover:text-green-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Variety & Preferences */}
            <div className="card bg-white rounded-2xl shadow-xl p-6">
              <div className="card-body p-0">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-6 h-6 text-teal-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Variety & Preferences
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Diverse Meals Checkbox */}
                  <div className="form-control">
                    <label className="label cursor-pointer gap-3">
                      <input
                        type="checkbox"
                        checked={formData.wantDiverseMeals}
                        onChange={(e) =>
                          handleInputChange(
                            "wantDiverseMeals",
                            e.target.checked
                          )
                        }
                        className="checkbox checkbox-accent checkbox-md"
                      />
                      <span className="label-text text-sm font-medium text-gray-700">
                        I want diverse meals (variety in cuisines and
                        ingredients)
                      </span>
                    </label>
                  </div>

                  {/* Preferred Cuisines */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm font-medium text-gray-700">
                        Preferred Cuisines
                      </span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {cuisineTypes.map((cuisine) => (
                        <button
                          key={cuisine}
                          type="button"
                          onClick={() => toggleCuisine(cuisine)}
                          className={`btn rounded-xl text-sm font-medium px-4 py-2 transition-all ${
                            formData.preferredCuisines.includes(cuisine)
                              ? "border-teal-500 bg-teal-50 text-teal-700"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {cuisine}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="card bg-white rounded-2xl shadow-xl p-6">
              <div className="card-body p-0">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn w-full bg-gradient-to-r from-teal-500 to-cyan-600 border-none text-white text-lg font-semibold py-4 px-8 rounded-xl shadow-lg hover:from-teal-600 hover:to-cyan-700 transition-all transform hover:scale-105"
                >
                  Create My Meal Plan
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MealPlanForm;
