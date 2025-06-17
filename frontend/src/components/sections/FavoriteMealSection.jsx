import React from "react";

const meals = [
  { name: "Quinoa Salad", icon: "🍎" },
  { name: "Grilled Chicken", icon: "🥕" },
  { name: "Avocado Toast", icon: "🍃" },
  { name: "Protein Shake", icon: "🍃" },
  { name: "Vegan Bowl", icon: "🍃" },
  { name: "Greek Yogurt", icon: "🍎" },
];

const FavoriteMealSection = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md space-y-4 w-xs max-w-sm">
      <h3 className="text-base font-semibold text-gray-800">Your favorite meals</h3>
      <div className="grid grid-cols-3 gap-4">
        {meals.map((meal) => (
          <div
            key={meal.name}
            className="bg-white rounded-xl flex flex-col items-center justify-center text-center p-4 shadow hover:shadow-md transition"
          >
            <div className="text-2xl">{meal.icon}</div>
            <p className="text-xs mt-2 text-gray-700">{meal.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMealSection;

