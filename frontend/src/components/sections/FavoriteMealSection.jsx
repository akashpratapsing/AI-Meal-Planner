import React, { useState } from "react";
import { Heart, Star, Plus, Clock, Users } from 'lucide-react';

const meals = [
  { 
    name: "Quinoa Salad", 
    icon: "🥗", 
    category: "Healthy",
    prepTime: "15 min",
    servings: 2,
    calories: 320,
    rating: 4.8,
    tags: ["Vegetarian", "Gluten-free"]
  },
  { 
    name: "Grilled Chicken", 
    icon: "🍗", 
    category: "Protein",
    prepTime: "25 min",
    servings: 1,
    calories: 450,
    rating: 4.9,
    tags: ["High-protein", "Keto"]
  },
  { 
    name: "Avocado Toast", 
    icon: "🥑", 
    category: "Healthy",
    prepTime: "5 min",
    servings: 1,
    calories: 280,
    rating: 4.6,
    tags: ["Vegan", "Quick"]
  },
  { 
    name: "Protein Shake", 
    icon: "🥤", 
    category: "Drink",
    prepTime: "3 min",
    servings: 1,
    calories: 220,
    rating: 4.7,
    tags: ["Post-workout", "Quick"]
  },
  { 
    name: "Vegan Bowl", 
    icon: "🥙", 
    category: "Healthy",
    prepTime: "20 min",
    servings: 2,
    calories: 380,
    rating: 4.8,
    tags: ["Vegan", "Fiber-rich"]
  },
  { 
    name: "Greek Yogurt", 
    icon: "🥛", 
    category: "Healthy",
    prepTime: "2 min",
    servings: 1,
    calories: 150,
    rating: 4.5,
    tags: ["Probiotic", "Quick"]
  },
   { 
    name: "Vegan Bowl", 
    icon: "🥙", 
    category: "Healthy",
    prepTime: "20 min",
    servings: 2,
    calories: 380,
    rating: 4.8,
    tags: ["Vegan", "Fiber-rich"]
  },
  { 
    name: "Greek Yogurt", 
    icon: "🥛", 
    category: "Healthy",
    prepTime: "2 min",
    servings: 1,
    calories: 150,
    rating: 4.5,
    tags: ["Probiotic", "Quick"]
  },
];

const FavoriteMealSection = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [hoveredMeal, setHoveredMeal] = useState(null);

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Healthy': return 'badge-success';
      case 'Protein': return 'badge-info';
      case 'Drink': return 'badge-warning';
      default: return 'badge-neutral';
    }
  };

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  const closeModal = () => {
    setSelectedMeal(null);
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
              key={meal.name}
              className={`card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                hoveredMeal === index ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleMealClick(meal)}
              onMouseEnter={() => setHoveredMeal(index)}
              onMouseLeave={() => setHoveredMeal(null)}
            >
              <div className="card-body items-center text-center p-4">
                <div className="text-4xl mb-2 transform transition-transform duration-300 hover:scale-110">
                  {meal.icon}
                </div>
                <p className="text-sm font-medium text-base-content mb-2">
                  {meal.name}
                </p>
                <div className={`badge ${getCategoryColor(meal.category)} badge-sm mb-2`}>
                  {meal.category}
                </div>
                <div className="flex items-center gap-1 text-xs text-base-content/60">
                  <Clock size={12} />
                  <span>{meal.prepTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-actions justify-center mt-4">
          <button className="btn btn-outline btn-sm gap-2">
            <Plus size={16} />
            Add More Favorites
          </button>
        </div>
      </div>

      {/* Modal for meal details */}
      {selectedMeal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="text-5xl">{selectedMeal.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{selectedMeal.name}</h3>
                  <div className={`badge ${getCategoryColor(selectedMeal.category)} badge-sm`}>
                    {selectedMeal.category}
                  </div>
                </div>
              </div>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="stat bg-base-200 rounded-lg p-3">
                <div className="stat-figure text-primary">
                  <Clock size={20} />
                </div>
                <div className="stat-title text-xs">Prep Time</div>
                <div className="stat-value text-sm">{selectedMeal.prepTime}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-3">
                <div className="stat-figure text-secondary">
                  <Users size={20} />
                </div>
                <div className="stat-title text-xs">Servings</div>
                <div className="stat-value text-sm">{selectedMeal.servings}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-3">
                <div className="stat-title text-xs">Calories</div>
                <div className="stat-value text-sm">{selectedMeal.calories}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-3">
                <div className="stat-figure text-warning">
                  <Star size={20} />
                </div>
                <div className="stat-title text-xs">Rating</div>
                <div className="stat-value text-sm">{selectedMeal.rating}</div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMeal.tags.map((tag, index) => (
                  <span key={index} className="badge badge-outline badge-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-action">
              <button className="btn btn-primary btn-sm">
                Cook This Meal
              </button>
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