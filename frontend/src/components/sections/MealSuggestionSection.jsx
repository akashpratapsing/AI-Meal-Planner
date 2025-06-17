import React from "react";

const upcomingMeals = [
  { icon: "🍎", title: "Healthy breakfast", date: "Sept 16" },
  { icon: "🥗", title: "Nutritious lunch", date: "Sept 16" },
];

const recentMeals = [
  { icon: "🍽️", title: "Healthy Recipes", date: "Sept 20" },
];

const MealSuggestionSection = () => {
  return (
    <div className="space-y-4 max-w-sm w-80">
      {/* Upcoming meal suggestions */}
      <div className="bg-white p-4 rounded-2xl shadow space-y-3 ">
        <h3 className="text-base font-semibold text-gray-800">Upcoming meal suggestions</h3>
        {upcomingMeals.map((meal, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="text-xl">{meal.icon}</span>
              <span className="text-sm text-gray-800">{meal.title}</span>
            </div>
            <span className="text-sm text-gray-600">{meal.date}</span>
          </div>
        ))}
      </div>

      {/* Recent meal suggestions */}
      <div className="bg-white p-4 rounded-2xl shadow space-y-3">
        <h3 className="text-base font-semibold text-gray-800">Recent meal suggestions</h3>
        {recentMeals.map((meal, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="text-xl">{meal.icon}</span>
              <span className="text-sm text-gray-800">{meal.title}</span>
            </div>
            <span className="text-sm text-gray-600">{meal.date}</span>
          </div>
        ))}

        <button className="btn btn-primary w-full rounded-full text-white text-sm mt-2">
          Create Meal Plan
        </button>
      </div>
    </div>
  );
};

export default MealSuggestionSection;

