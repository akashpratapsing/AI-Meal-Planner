import React, { useEffect, useState } from "react";
import { Calendar, User, Clock, Search, Filter } from "lucide-react";
import { getMealPlansByUser } from "../../services/mealService";
import { getCustomMealPlansByUserId } from "../../services/customMealService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MealPlanList = () => {
  const [regularPlans, setRegularPlans] = useState([]);
  const [customPlans, setCustomPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode(token);
        const userId =  decoded.userId || decoded.id;

        const [regular, custom] = await Promise.all([
          getMealPlansByUser(token),
          getCustomMealPlansByUserId(userId, token),
        ]);

        setRegularPlans(regular || []);
        setCustomPlans(custom || []);
        console.log(custom);
      } catch (error) {
        console.error("Error fetching plans:", error.message);
      }
    };

    fetchPlans();
  }, []);

  const dietaryTypes = {
    vegetarian: { label: "Vegetarian", icon: "🥬", className: "badge badge-success" },
    vegan: { label: "Vegan", icon: "🌱", className: "badge badge-accent" },
    "non-vegetarian": { label: "Non-Veg", icon: "🍗", className: "badge badge-error" },
    pescatarian: { label: "Pescatarian", icon: "🐟", className: "badge badge-info" },
    "gluten-free": { label: "Gluten-Free", icon: "🌾", className: "badge badge-warning w-40" },
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredRegularPlans = regularPlans.filter((plan) => {
    const nameMatch = (plan.mealName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const goalMatch = (plan.healthGoal || "").toLowerCase().includes(searchTerm.toLowerCase());
    const dietaryMatch = filterType === "all" || plan.dietaryType === filterType;
    return (nameMatch || goalMatch) && dietaryMatch;
  });

  const renderRegularPlans = () =>
    filteredRegularPlans.map((plan) => {
      const badge = dietaryTypes[plan.dietaryType] || {};
      return (
        <div key={plan.id} className="card bg-base-200 shadow-md border border-base-300">
          <div className="card-body space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{plan.mealName}</h3>
              {badge.label && (
                <div className={badge.className}>
                  {badge.icon} {badge.label}
                </div>
              )}
            </div>

            <p className="text-sm opacity-80">{plan.healthGoal}</p>

            <div className="text-sm opacity-70 flex items-center gap-2">
              <User className="w-4 h-4" />
              {plan.meals?.length || 0} meals
            </div>

            <div className="text-sm opacity-70 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(plan.generatedDate)}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                className="btn btn-primary btn-sm flex-1"
                onClick={() => navigate(`/dashboard/mealPlans/${plan.id}`)}
              >
                View Plan
              </button>
              <button className="btn btn-outline btn-sm">
                <Clock className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      );
    });

  const renderCustomPlans = () =>
    customPlans.map((plan) => (
      <div key={plan.id} className="card bg-base-200 shadow-md border border-base-300">
        <div className="card-body space-y-2">
          <h3 className="text-xl font-bold">{plan.mealPlanName}</h3>

          <p className="text-sm opacity-80">Meals Per Day: {plan.mealsPerDay}</p>

          <div className="text-sm opacity-70 flex items-center gap-2">
            <User className="w-4 h-4" />
            {plan.selectedMeals?.length || 0} selected meals
          </div>

          <div className="text-sm opacity-70 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatDate(plan.createdDate)}
          </div>

          {plan.selectedMeals?.length > 0 && (
            <div className="flex gap-2 overflow-x-auto py-2">
              {plan.selectedMeals.slice(0, 3).map((meal) => (
                <img
                  key={meal.idMeal}
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-12 h-12 rounded object-cover border"
                  title={meal.strMeal}
                />
              ))}
              {plan.selectedMeals.length > 3 && (
                <span className="text-sm text-gray-500 self-center">
                  +{plan.selectedMeals.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="mt-4">
            <button
              className="btn btn-primary btn-sm w-full"
              onClick={() => navigate(`/dashboard/customMealPlans/${plan.id}`)}
            >
              View Plan
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className=" min-h-screen py-10 px-4 text-base-content">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-1">📋 My Meal Plans</h2>
          <p className="text-opacity-70">Browse and manage your saved meal plans</p>
        </div>

        {/* Filters - only for regular plans */}
        <div className="bg-base-200 rounded-xl p-6 shadow mb-6 border border-base-300">
          <div className="flex flex-col md:flex-row gap-4">
            <label className="input input-bordered flex items-center gap-2 w-full md:w-2/3">
              <Search className="w-4 h-4" />
              <input
                type="text"
                className="grow"
                placeholder="Search meal plans"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 w-full md:w-1/3">
              <Filter className="w-4 h-4" />
              <select
                className="select select-bordered w-full"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                {Object.entries(dietaryTypes).map(([key, val]) => (
                  <option value={key} key={key}>
                    {val.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Regular Plans */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">🧠 Regular Meal Plans</h3>
          {filteredRegularPlans.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderRegularPlans()}
            </div>
          ) : (
            <p className="text-center text-gray-500">No regular plans found.</p>
          )}
        </div>

        {/* Custom Plans */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">👤 Custom Meal Plans</h3>
          {customPlans.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderCustomPlans()}
            </div>
          ) : (
            <p className="text-center text-gray-500">No custom plans found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanList;
