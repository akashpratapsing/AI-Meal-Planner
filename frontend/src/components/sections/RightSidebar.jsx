import React from "react";

const tags = [
  { name: "Meal types", icon: "🍽️" },
  { name: "Snack options", icon: "🌿" },
  { name: "Desserts", icon: "🍰" },
  { name: "Smoothies", icon: "🍔" },
  { name: "Fitness goals", icon: "🐟" },
  { name: "Dietary tips", icon: "🍎" },
];

const plans = [
  {
    name: "Alex Green",
    role: "Meal Planning",
    img: "https://source.unsplash.com/40x40/?salad",
  },
  {
    name: "Jamie Fit",
    role: "Nutritionist",
    img: "https://source.unsplash.com/40x40/?healthy",
  },
  {
    name: "Chris Blue",
    role: "Fitness Coach",
    img: "https://source.unsplash.com/40x40/?abstract",
  },
  {
    name: "Taylor Swift",
    role: "Dietitian",
    img: "https://source.unsplash.com/40x40/?workout",
  },
  {
    name: "Jordan Black",
    role: "Wellness Advisor",
    img: "https://source.unsplash.com/40x40/?veggies",
  },
];

const RightSidebar = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-6 h-full max-w-sm">
      {/* Find Recipes */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Find recipes</h3>
        <div className="grid grid-cols-3 gap-4">
          {tags.map((tag) => (
            <div
              key={tag.name}
              className="bg-white rounded-xl flex flex-col items-center justify-center text-center p-3 shadow-sm hover:shadow-md transition"
            >
              <div className="text-2xl">{tag.icon}</div>
              <p className="text-xs mt-2 text-gray-700">{tag.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Plans */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Your meal plans</h3>
        <ul className="space-y-3 p-4">
          {plans.map((user) => (
            <li key={user.name} className="flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
              <button className="btn btn-ghost btn-xs px-2">
                <svg
                  className="w-4 h-4 fill-current text-gray-600"
                  viewBox="0 0 24 24"
                >
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
