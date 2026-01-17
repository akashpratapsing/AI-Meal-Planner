import React, { useEffect, useState } from "react";
import { Calendar, User, Search, Filter } from "lucide-react";
import { getMealPlansByUser } from "../../services/mealService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MealPlanList = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();

  // Dietary badge definitions
  const dietaryTypes = {
    vegetarian: { label: "Vegetarian", icon: "🥬", className: "badge badge-success" },
    vegan: { label: "Vegan", icon: "🌱", className: "badge badge-accent" },
    "non-vegetarian": { label: "Non-Veg", icon: "🍗", className: "badge badge-error" },
    pescatarian: { label: "Pescatarian", icon: "🐟", className: "badge badge-info" },
    "gluten-free": { label: "Gluten-Free", icon: "🌾", className: "badge badge-warning" },
  };

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode(token);
        const userId = decoded?.id || decoded?.userId;

        if (!userId) {
          // console.error("User ID missing in token");
          return;
        }

        const plans = await getMealPlansByUser(token);
        setMealPlans(plans || []);
      } catch (error) {
        // console.error("Error fetching meal plans:", error.message);
        toast.error("Failed to load meal plans.");
      }
    };

    fetchMealPlans();
  }, []);

  // Helper to format dates
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Search + filter
  const filteredPlans = mealPlans.filter((plan) => {
    const nameMatch = (plan.mealName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const goalMatch = (plan.healthGoal || "").toLowerCase().includes(searchTerm.toLowerCase());
    const dietaryMatch = filterType === "all" || plan.dietaryType === filterType;
    return (nameMatch || goalMatch) && dietaryMatch;
  });

  return (
    <div className="min-h-screen py-10 px-4 text-base-content">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-1">📋 My Meal Plans</h2>
          <p className="opacity-70">All your generated meal plans in one place</p>
        </div>

        {/* Meal Plans Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">🥗 Meal Plans</h3>

          {filteredPlans.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredPlans.map((plan) => {
                const badge = dietaryTypes[plan.dietaryType] || {};

                return (
                  <div
                    key={plan.id}
                    className="card bg-base-200 shadow-md border border-base-300 hover:shadow-xl transition rounded-xl"
                  >
                    <div className="card-body space-y-3">

                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold">{plan.mealName}</h3>

                        {badge.label && (
                          <div className={badge.className}>
                            {badge.icon} {badge.label}
                          </div>
                        )}
                      </div>

                      {/* Health Goal */}
                      <p className="text-sm opacity-80">{plan.healthGoal}</p>

                      {/* Meals count */}
                      <div className="text-sm opacity-70 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {plan.meals?.length || 0} meals
                      </div>

                      {/* Date */}
                      <div className="text-sm opacity-70 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(plan.generatedDate)}
                      </div>

                      {/* Actions */}
                      <button
                        className="btn btn-primary btn-sm w-full mt-3"
                        onClick={() => navigate(`/dashboard/mealPlans/${plan.id}`)}
                      >
                        View Plan
                      </button>

                    </div>
                  </div>
                );
              })}

            </div>
          ) : (
            <p className="text-center text-gray-500">No meal plans found.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default MealPlanList;