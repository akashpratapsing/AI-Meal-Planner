import React, { useEffect, useState } from "react";
import { Heart, Star, Plus, Clock, Users, Trash2 } from "lucide-react";
import {
  deleteFavoriteMeal,
  getFavoriteMeals,
} from "../../services/favMealService";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const FavoriteMealSection = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [hoveredMeal, setHoveredMeal] = useState(null);

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

  const userId = getUserIdFromToken();
  const token = localStorage.getItem("token");

  const getCategoryColor = (category) => {
    switch (category) {
      case "Healthy":
        return "badge-success";
      case "Protein":
        return "badge-info";
      case "Drink":
        return "badge-warning";
      default:
        return "badge-neutral";
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavoriteMeals(userId, token);
        setMeals(favorites);
        console.log(favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error.message);
        toast.error("Failed to load favorite meals.");
      }
    };

    if (userId && token) fetchFavorites();
  }, [userId, token]);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    console.log(meal);
  };

  const closeModal = () => {
    setSelectedMeal(null);
  };

  const handleDelete = async (mealId) => {
    try {
      await deleteFavoriteMeal(mealId, token);
      setMeals((prev) => prev.filter((meal) => meal.id !== mealId));
      toast.success("Meal removed from favorites.");
    } catch (error) {
      console.error("Error deleting meal:", error.message);
      toast.error("Failed to delete favorite meal.");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl max-w-full">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="text-error" size={20} />
            <h3 className="card-title text-lg">Your Favorite Meals</h3>
          </div>
          <div className="badge badge-outline">{meals.length} meals</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {meals.map((meal, index) => (
            <div
              key={meal.id}
              className={`card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                hoveredMeal === index ? "ring-2 ring-primary" : ""
              }`}
              onMouseEnter={() => setHoveredMeal(index)}
              onMouseLeave={() => setHoveredMeal(null)}
            >
              <div className="card-body items-center text-center p-4">
                <div className="text-4xl mb-2">{meal.emoji || "🍽️"}</div>
                <p
                  className="text-sm font-medium text-base-content mb-2"
                  onClick={() => handleMealClick(meal)}
                >
                  {meal.name}
                </p>
                <div
                  className={`badge ${getCategoryColor(
                    meal.category || "Healthy"
                  )} badge-sm mb-2`}
                >
                  {meal.category || "Healthy"}
                </div>
                <div className="flex items-center gap-1 text-xs text-base-content/60">
                  <Clock size={12} />
                  <span>{meal.prepTime || "N/A"}</span>
                </div>
                <button
                  className="btn btn-sm btn-outline mt-2"
                  onClick={() => handleDelete(meal.id)}
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="card-actions justify-center mt-4">
          <button className="btn btn-outline btn-sm gap-2">
            <Plus size={16} />
            Add More Favorites
          </button>
        </div> */}
      </div>

      {/* Modal for meal details */}
      {selectedMeal && (
        <div className="modal modal-open">
          <div className="modal-box">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{selectedMeal.name}</h3>
              </div>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            {/* Meal Items */}
            {selectedMeal.items && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Ingredients</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {selectedMeal.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nutritional Info */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-sm text-center">
              <div className="bg-blue-100 rounded-lg p-3">
                <p className="text-lg font-semibold text-blue-800">
                  {selectedMeal.calories || 0} kcal
                </p>
                <p className="text-gray-600">Calories</p>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <p className="text-lg font-semibold text-green-800">
                  {selectedMeal.protein || 0} g
                </p>
                <p className="text-gray-600">Protein</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3">
                <p className="text-lg font-semibold text-yellow-800">
                  {selectedMeal.carbs || 0} g
                </p>
                <p className="text-gray-600">Carbs</p>
              </div>
              <div className="bg-pink-100 rounded-lg p-3">
                <p className="text-lg font-semibold text-pink-800">
                  {selectedMeal.fats || 0} g
                </p>
                <p className="text-gray-600">Fats</p>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-action">
              {/* <button className="btn btn-primary btn-sm">Cook This Meal</button> */}
              <button className="btn btn-ghost btn-sm" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteMealSection;
