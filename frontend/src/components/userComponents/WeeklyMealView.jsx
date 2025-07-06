import React, { useState } from "react";
import { Calendar, Clock, ChefHat, Users, Heart, Star } from "lucide-react";

// Enhanced dummy data for all 7 days
const sampleWeeklyPlan = {
  Monday: [
    { 
      id: 1, 
      time: "Breakfast", 
      name: "Oatmeal with berries & almonds",
      calories: 320,
      prepTime: "10 min",
      difficulty: "Easy",
      dietType: "vegetarian",
      rating: 4.5,
      emoji: "🥣"
    },
    { 
      id: 2, 
      time: "Lunch", 
      name: "Grilled chicken salad",
      calories: 450,
      prepTime: "20 min",
      difficulty: "Medium",
      dietType: "non-vegetarian",
      rating: 4.7,
      emoji: "🥗"
    },
    { 
      id: 3, 
      time: "Dinner", 
      name: "Steamed salmon with veggies",
      calories: 520,
      prepTime: "25 min",
      difficulty: "Medium",
      dietType: "non-vegetarian",
      rating: 4.8,
      emoji: "🍽️"
    },
  ],
  Tuesday: [
    { 
      id: 4, 
      time: "Breakfast", 
      name: "Avocado toast with poached egg",
      calories: 380,
      prepTime: "15 min",
      difficulty: "Easy",
      dietType: "vegetarian",
      rating: 4.6,
      emoji: "🥣"
    },
    { 
      id: 5, 
      time: "Lunch", 
      name: "Quinoa bowl with tofu & greens",
      calories: 420,
      prepTime: "18 min",
      difficulty: "Easy",
      dietType: "vegan",
      rating: 4.4,
      emoji: "🥗"
    },
    { 
      id: 6, 
      time: "Dinner", 
      name: "Lentil soup with whole grain bread",
      calories: 480,
      prepTime: "30 min",
      difficulty: "Medium",
      dietType: "vegan",
      rating: 4.3,
      emoji: "🍽️"
    },
  ],
  Wednesday: [
    { 
      id: 7, 
      time: "Breakfast", 
      name: "Greek yogurt parfait with granola",
      calories: 340,
      prepTime: "8 min",
      difficulty: "Easy",
      dietType: "vegetarian",
      rating: 4.5,
      emoji: "🥣"
    },
    { 
      id: 8, 
      time: "Lunch", 
      name: "Turkey and hummus wrap",
      calories: 410,
      prepTime: "12 min",
      difficulty: "Easy",
      dietType: "non-vegetarian",
      rating: 4.2,
      emoji: "🥗"
    },
    { 
      id: 9, 
      time: "Dinner", 
      name: "Stir-fried vegetables with brown rice",
      calories: 390,
      prepTime: "22 min",
      difficulty: "Medium",
      dietType: "vegan",
      rating: 4.4,
      emoji: "🍽️"
    },
  ],
  Thursday: [
    { 
      id: 10, 
      time: "Breakfast", 
      name: "Smoothie bowl with tropical fruits",
      calories: 290,
      prepTime: "12 min",
      difficulty: "Easy",
      dietType: "vegan",
      rating: 4.6,
      emoji: "🥣"
    },
    { 
      id: 11, 
      time: "Lunch", 
      name: "Caprese salad with balsamic glaze",
      calories: 350,
      prepTime: "10 min",
      difficulty: "Easy",
      dietType: "vegetarian",
      rating: 4.5,
      emoji: "🥗"
    },
    { 
      id: 12, 
      time: "Dinner", 
      name: "Herb-crusted chicken with sweet potato",
      calories: 540,
      prepTime: "35 min",
      difficulty: "Hard",
      dietType: "non-vegetarian",
      rating: 4.9,
      emoji: "🍽️"
    },
  ],
  Friday: [
    { 
      id: 13, 
      time: "Breakfast", 
      name: "Whole grain pancakes with maple syrup",
      calories: 420,
      prepTime: "20 min",
      difficulty: "Medium",
      dietType: "vegetarian",
      rating: 4.7,
      emoji: "🥣"
    },
    { 
      id: 14, 
      time: "Lunch", 
      name: "Sushi bowl with edamame",
      calories: 480,
      prepTime: "25 min",
      difficulty: "Medium",
      dietType: "non-vegetarian",
      rating: 4.8,
      emoji: "🥗"
    },
    { 
      id: 15, 
      time: "Dinner", 
      name: "Margherita pizza with side salad",
      calories: 620,
      prepTime: "30 min",
      difficulty: "Medium",
      dietType: "vegetarian",
      rating: 4.6,
      emoji: "🍽️"
    },
  ],
  Saturday: [
    { 
      id: 16, 
      time: "Breakfast", 
      name: "French toast with fresh berries",
      calories: 450,
      prepTime: "18 min",
      difficulty: "Medium",
      dietType: "vegetarian",
      rating: 4.8,
      emoji: "🥣"
    },
    { 
      id: 17, 
      time: "Lunch", 
      name: "Mediterranean grain bowl",
      calories: 520,
      prepTime: "15 min",
      difficulty: "Easy",
      dietType: "vegetarian",
      rating: 4.5,
      emoji: "🥗"
    },
    { 
      id: 18, 
      time: "Dinner", 
      name: "Grilled steak with roasted vegetables",
      calories: 680,
      prepTime: "40 min",
      difficulty: "Hard",
      dietType: "non-vegetarian",
      rating: 4.9,
      emoji: "🍽️"
    },
  ],
  Sunday: [
    { 
      id: 19, 
      time: "Breakfast", 
      name: "Eggs Benedict with hollandaise",
      calories: 520,
      prepTime: "25 min",
      difficulty: "Hard",
      dietType: "vegetarian",
      rating: 4.9,
      emoji: "🥣"
    },
    { 
      id: 20, 
      time: "Lunch", 
      name: "Caesar salad with grilled chicken",
      calories: 460,
      prepTime: "20 min",
      difficulty: "Medium",
      dietType: "non-vegetarian",
      rating: 4.7,
      emoji: "🥗"
    },
    { 
      id: 21, 
      time: "Dinner", 
      name: "Roast beef with Yorkshire pudding",
      calories: 720,
      prepTime: "60 min",
      difficulty: "Hard",
      dietType: "non-vegetarian",
      rating: 4.8,
      emoji: "🍽️"
    },
     { 
      id: 22, 
      time: "Snacks", 
      name: "Roast beef with Yorkshire pudding",
      calories: 720,
      prepTime: "60 min",
      difficulty: "Hard",
      dietType: "non-vegetarian",
      rating: 4.8,
      emoji: "🍽️"
    },
  ],
};

const daysOfWeek = Object.keys(sampleWeeklyPlan);

const WeeklyMealView = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const handleMealClick = (mealId) => {
    // Mock navigation - replace with actual navigation logic
    console.log(`Navigating to meal ${mealId}`);
    alert(`Viewing details for meal ID: ${mealId}`);
  };

  const getDietaryBadge = (dietType) => {
    const badges = {
      vegetarian: { class: "badge-success", icon: "🥬" },
      vegan: { class: "badge-accent", icon: "🌱" },
      "non-vegetarian": { class: "badge-error", icon: "🍗" },
    };
    return badges[dietType] || badges.vegetarian;
  };

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      Easy: "badge-success",
      Medium: "badge-warning",
      Hard: "badge-error",
    };
    return badges[difficulty] || "badge-neutral";
  };

  const getTotalCalories = () => {
    return sampleWeeklyPlan[selectedDay]?.reduce((total, meal) => total + meal.calories, 0) || 0;
  };

  return (
    <div className="bg-base-100 min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-base-content mb-4 flex items-center justify-center gap-3">
            <Calendar className="w-12 h-12 text-primary" />
            Weekly Meal Plan
          </h1>
          <p className="text-base-content/70 text-xl">
            Plan your healthy meals for the entire week
          </p>
        </div>

        {/* Day Selector using DaisyUI tabs */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <div className="tabs tabs-boxed justify-center">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`tab tab-lg font-semibold ${
                    selectedDay === day ? "tab-active" : ""
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Day Stats */}
        <div className="stats shadow mb-8 w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="stat-title">Selected Day</div>
            <div className="stat-value text-primary">{selectedDay}</div>
            <div className="stat-desc">Click meals to view details</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <ChefHat className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Meals</div>
            <div className="stat-value text-secondary">{sampleWeeklyPlan[selectedDay]?.length || 0}</div>
            <div className="stat-desc">Breakfast, Lunch, Dinner</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-accent">
              <Users className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Calories</div>
            <div className="stat-value text-accent">{getTotalCalories().toLocaleString()}</div>
            <div className="stat-desc">Daily intake</div>
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleWeeklyPlan[selectedDay]?.map((meal) => {
            const dietBadge = getDietaryBadge(meal.dietType);
            const difficultyBadge = getDifficultyBadge(meal.difficulty);
            
            return (
              <div
                key={meal.id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="card-body">
                  {/* Meal Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-12 h-12">
                          <span className="text-2xl">{meal.emoji}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="card-title text-lg">{meal.time}</h3>
                        <div className="rating rating-sm">
                          {[...Array(5)].map((_, i) => (
                            <input
                              key={i}
                              type="radio"
                              className={`mask mask-star-2 ${
                                i < Math.floor(meal.rating)
                                  ? "bg-orange-400"
                                  : "bg-gray-300"
                              }`}
                              disabled
                            />
                          ))}
                          <span className="text-sm text-base-content/70 ml-2">
                            {meal.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`badge ${dietBadge.class} gap-1`}>
                      <span>{dietBadge.icon}</span>
                      <span className="text-xs">{meal.dietType.replace('-', ' ')}</span>
                    </div>
                  </div>

                  {/* Meal Name */}
                  <h4 className="font-semibold text-base-content mb-4 leading-tight">
                    {meal.name}
                  </h4>

                  {/* Meal Details */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <div className="badge badge-outline gap-1">
                      <Clock className="w-3 h-3" />
                      {meal.prepTime}
                    </div>
                    <div className="badge badge-outline gap-1">
                      <Users className="w-3 h-3" />
                      {meal.calories} cal
                    </div>
                    <div className={`badge ${difficultyBadge} gap-1`}>
                      <ChefHat className="w-3 h-3" />
                      {meal.difficulty}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="card-actions justify-between">
                    <button className="btn btn-ghost btn-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMealClick(meal.id)}
                      className="btn btn-primary btn-sm"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="alert alert-info">
            <span>🍽️ Healthy eating made simple with personalized meal planning</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyMealView;