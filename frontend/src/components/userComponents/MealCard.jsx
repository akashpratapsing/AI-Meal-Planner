import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { addFavoriteMeal } from "../../services/favMealService";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const MealCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const meal = location.state?.meal;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customMealName, setCustomMealName] = useState("");

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded?.id || null;
    } catch {
      return null;
    }
  };

  const handleSaveFavorite = async () => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken(token);

    if (!customMealName.trim()) {
      toast.error("Please enter a meal name");
      return;
    }

    const favoriteMeal = {
      userId: userId,
      name: customMealName,
      items: meal.items,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
    };

    try {
      await addFavoriteMeal(userId, favoriteMeal, token);
      toast.success("Meal added to favorites!");
      setIsModalOpen(false);
      setCustomMealName("");
    } catch (error) {
      toast.error("Failed to add favorite");
      console.error("Add to favorite failed: ", error);
    }
  };

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#d2f0f8] text-xl font-semibold text-gray-700">
        Meal not found or not passed properly.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-50 flex items-center justify-center px-4 py-8">
      <div className="bg-base-100 shadow-lg rounded-2xl overflow-hidden w-full max-w-xl">
        <img
          src={meal.image || "https://source.unsplash.com/800x400/?healthy-meal"}
          alt={meal.name || "Meal Image"}
          className="w-full h-64 sm:h-80 object-cover"
        />

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start mb-4">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>

            {/* Heart Icon */}
            <div className="tooltip tooltip-left" data-tip="Add to Favorite">
              <button
                className="btn btn-sm btn-circle hover:bg-red-100"
                onClick={() => setIsModalOpen(true)}
              >
                <Heart className="text-red-500" size={18} />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{meal.name}</h2>
            <span className="badge badge-primary text-sm px-4 py-2">
              {meal.time}
            </span>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">Ingredients</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              {meal.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">Nutrition Info</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-100 rounded-xl p-4">
                <p className="text-lg font-bold text-blue-800">{meal.calories} kcal</p>
                <p className="text-sm text-gray-600">Calories</p>
              </div>
              <div className="bg-green-100 rounded-xl p-4">
                <p className="text-lg font-bold text-green-800">{meal.protein} g</p>
                <p className="text-sm text-gray-600">Protein</p>
              </div>
              <div className="bg-yellow-100 rounded-xl p-4">
                <p className="text-lg font-bold text-yellow-800">{meal.carbs} g</p>
                <p className="text-sm text-gray-600">Carbs</p>
              </div>
              <div className="bg-pink-100 rounded-xl p-4">
                <p className="text-lg font-bold text-pink-800">{meal.fats} g</p>
                <p className="text-sm text-gray-600">Fats</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Meal Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add to Favorites</h3>
            <label className="label">
              <span className="label-text">Meal Name</span>
            </label>
            <input
              type="text"
              value={customMealName}
              onChange={(e) => setCustomMealName(e.target.value)}
              className="input input-bordered w-full mb-4"
              placeholder="Enter custom meal name"
            />
            <div className="modal-action">
              <button className="btn btn-primary btn-sm" onClick={handleSaveFavorite}>
                Save
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCard;
