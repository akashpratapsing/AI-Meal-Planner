import React, { useEffect, useState } from "react";
import { Heart, RefreshCw, Clock, MapPin, Tag, ChefHat } from "lucide-react";
import axios from "axios";

const SuggestedMeal = () => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const [isFavorited, setIsFavorited] = useState(false);

  const fetchRandomMeal = async () => {
    setLoading(true);
    try {
       const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      // const data = await response.json();
      const rawMeal = response.data.meals[0];

      // Extract ingredients and measures
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = rawMeal[`strIngredient${i}`];
        const measure = rawMeal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(`${measure?.trim()} ${ingredient.trim()}`);
        }
      }

      const formattedMeal = {
        id: rawMeal.idMeal,
        name: rawMeal.strMeal,
        image: rawMeal.strMealThumb,
        instructions: rawMeal.strInstructions,
        tags: rawMeal.strTags ? rawMeal.strTags.split(",") : [],
        ingredients,
        category: rawMeal.strCategory,
        area: rawMeal.strArea,
      };

      setMeal(formattedMeal);
    } catch (error) {
      console.error("Error fetching meal:", error);
      // Simple alert instead of toast
      alert("Failed to fetch random meal.");
    }
    setLoading(false);
    setIsFavorited(false);
    setShowModal(false);
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  // const handleFavorite = () => {
  //   setIsFavorited(!isFavorited);
  //   // Simple alert instead of toast
  //   alert(isFavorited ? "Removed from favorites" : "Added to favorites");
  // };

  if (loading || !meal) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
            <ChefHat className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-500 w-8 h-8" />
          </div>
          <p className="text-lg font-medium text-gray-700">Discovering your next favorite meal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🍽️ Meal Suggestion
          </h1>
          <p className="text-gray-600">Discover your next delicious adventure</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2 relative group">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-96 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Favorite Button */}
              {/* <button
                onClick={handleFavorite}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
                  isFavorited 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
              </button> */}
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="badge badge-primary badge-lg">
                  #{meal.id}
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                {meal.name}
              </h2>

              {/* Meta Information */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <ChefHat className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">Category:</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                    {meal.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Origin:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {meal.area}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {meal.tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-gray-600">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {meal.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="badge badge-outline badge-sm hover:badge-primary transition-colors"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="btn btn-outline btn-lg flex-1 group"
                  onClick={fetchRandomMeal}
                  disabled={loading}
                >
                  <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  Try Another
                </button>
                
                <button
                  className="btn btn-primary btn-lg flex-1"
                  onClick={() => setShowModal(true)}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Modal */}
        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6 sticky top-0 bg-base-100 pb-4 border-b">
                <div>
                  <h3 className="font-bold text-2xl text-gray-800">{meal.name}</h3>
                  <p className="text-gray-600 mt-1">{meal.category} • {meal.area}</p>
                </div>
                <button
                  className="btn btn-sm btn-circle btn-ghost hover:bg-red-100 hover:text-red-600"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Ingredients Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ChefHat className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg">Ingredients</h4>
                  </div>
                  
                  <div className="space-y-2">
                    {meal.ingredients.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg">Instructions</h4>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {meal.instructions}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-action pt-6 border-t">
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                {/* <button
                  className="btn btn-primary"
                  onClick={handleFavorite}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                </button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedMeal;