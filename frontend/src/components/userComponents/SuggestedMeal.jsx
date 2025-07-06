import React, { useState } from 'react';
import { Clock, Users, Star, Heart } from 'lucide-react';

const SuggestedMeal = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(0);

  const meals = [
    {
      id: 1,
      name: "Grilled Salmon with Quinoa",
      description: "Fresh Atlantic salmon grilled to perfection, served with fluffy quinoa and roasted vegetables. A healthy and delicious meal packed with omega-3 fatty acids.",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      cookTime: "25 mins",
      servings: 2,
      difficulty: "Medium",
      rating: 4.8,
      calories: 420,
      tags: ["Healthy", "Protein-rich", "Gluten-free"],
      ingredients: ["Salmon fillet", "Quinoa", "Broccoli", "Carrots", "Olive oil", "Lemon"]
    },
    {
      id: 2,
      name: "Vegetarian Buddha Bowl",
      description: "A colorful and nutritious bowl packed with roasted chickpeas, quinoa, avocado, and fresh vegetables, drizzled with tahini dressing.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      cookTime: "30 mins",
      servings: 1,
      difficulty: "Easy",
      rating: 4.6,
      calories: 380,
      tags: ["Vegan", "Healthy", "Fiber-rich"],
      ingredients: ["Chickpeas", "Quinoa", "Avocado", "Spinach", "Carrots", "Tahini"]
    },
    {
      id: 3,
      name: "Chicken Teriyaki Stir-fry",
      description: "Tender chicken pieces stir-fried with colorful vegetables in a savory teriyaki sauce, served over steamed rice.",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
      cookTime: "20 mins",
      servings: 3,
      difficulty: "Easy",
      rating: 4.7,
      calories: 450,
      tags: ["Quick", "Asian", "Protein-rich"],
      ingredients: ["Chicken breast", "Bell peppers", "Broccoli", "Teriyaki sauce", "Rice", "Garlic"]
    }
  ];

  const meal = meals[currentMeal];

  const handleNextMeal = () => {
    setCurrentMeal((prev) => (prev + 1) % meals.length);
    setIsFavorited(false);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'badge-success';
      case 'medium': return 'badge-warning';
      case 'hard': return 'badge-error';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <figure className="relative">
          <img 
            src={meal.image} 
            alt={meal.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <button 
              className={`btn btn-circle btn-sm ${isFavorited ? 'btn-error' : 'btn-ghost bg-base-100 bg-opacity-80'}`}
              onClick={handleFavorite}
            >
              <Heart 
                size={16} 
                className={isFavorited ? 'fill-current' : ''} 
              />
            </button>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={`${i < Math.floor(meal.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-white text-sm ml-1 bg-black bg-opacity-50 px-1 rounded">
                {meal.rating}
              </span>
            </div>
          </div>
        </figure>
        
        <div className="card-body">
          <h2 className="card-title text-lg">
            {meal.name}
            <div className={`badge ${getDifficultyColor(meal.difficulty)}`}>
              {meal.difficulty}
            </div>
          </h2>
          
          <p className="text-sm text-base-content opacity-70 mb-3">
            {meal.description}
          </p>
          
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1 text-sm">
              <Clock size={16} className="text-primary" />
              <span>{meal.cookTime}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Users size={16} className="text-primary" />
              <span>{meal.servings} serving{meal.servings > 1 ? 's' : ''}</span>
            </div>
            <div className="text-sm font-semibold">
              {meal.calories} cal
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {meal.tags.map((tag, index) => (
                <span key={index} className="badge badge-outline badge-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2">Ingredients:</h4>
            <div className="text-sm text-base-content opacity-70">
              {meal.ingredients.join(', ')}
            </div>
          </div>
          
          <div className="card-actions justify-between">
            <button 
              className="btn btn-outline btn-sm"
              onClick={handleNextMeal}
            >
              Try Another
            </button>
            <button className="btn btn-primary btn-sm">
              Start Cooking
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <div className="text-sm text-base-content opacity-50">
          Meal {currentMeal + 1} of {meals.length}
        </div>
        <div className="flex justify-center gap-2 mt-2">
          {meals.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentMeal ? 'bg-primary' : 'bg-base-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedMeal;