import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock, ChefHat, Users, Heart } from "lucide-react";
import { getMealPlanById, saveMealPlan } from "../../services/mealService";

const dayMap = {
  "Day 1": "Monday",
  "Day 2": "Tuesday",
  "Day 3": "Wednesday",
  "Day 4": "Thursday",
  "Day 5": "Friday",
  "Day 6": "Saturday",
  "Day 7": "Sunday",
};

const WeeklyMealView = () => {
  const { id } = useParams();
  const location = useLocation();
  const [mealPlan, setMealPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [mealPlanName, setMealPlanName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate(); 

  // const passedMealPlan = location.state?.mealPlan;
  // console.log("passed plan : ", passedMealPlan);
  // console.log("id : ", id);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getMealPlanById(id, token);
        console.log("Fetched from API:", data);
        setMealPlan(data);
        setMealPlanName(data.mealName || "");
      } catch (error) {
        console.error("Error fetching meal plan:", error.message);
      }
    };

    if (location.state?.mealPlan) {
      console.log("Loaded from location.state");
      setMealPlan(location.state.mealPlan);
      setMealPlanName(location.state.mealPlan.mealName || "");
    } else if (id) {
      fetchMealPlan();
    }
  }, [id, location.state]);

  const groupMealsByDay = () => {
    if (!mealPlan?.meals) return {};

    return mealPlan.meals.reduce((acc, meal) => {
      const match = meal.name?.match(/Day (\d)/);
      const dayKey = match ? `Day ${match[1]}` : "Day 1";
      const weekday = dayMap[dayKey] || "Monday";
      if (!acc[weekday]) acc[weekday] = [];
      acc[weekday].push(meal);
      return acc;
    }, {});
  };

  const groupedMeals = groupMealsByDay();
  const daysOfWeek = Object.keys(groupedMeals);

  const getTotalCalories = () => {
    return (
      groupedMeals[selectedDay]?.reduce(
        (total, meal) => total + (meal.calories || 0),
        0
      ) || 0
    );
  };

 const handleMealClick = (meal) => {
  navigate(`/dashboard/mealPlans/${id}/view`, { state: { meal } });
};

  const handleSaveMealPlan = async () => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken();

    if (!token || !userId) {
      alert("You must be logged in to save your meal plan.");
      return;
    }

    if (!mealPlanName.trim()) {
      alert("Please enter a meal plan name.");
      return;
    }

    try {
      setIsSaving(true);
      const planToSave = {
        ...mealPlan,
        mealName: mealPlanName.trim(),
        // userId: userId,
        generatedDate: new Date().toISOString(),
      };

      console.log("Meal Plan to Save : ", planToSave);
      const saved = await saveMealPlan(planToSave, token);
      alert("Meal Plan saved successfully!");
      console.log("Saved Meal Plan:", saved);
    } catch (error) {
      console.error("Error saving meal plan:", error.message);
      alert("Failed to save meal plan.");
    } finally {
      setIsSaving(false);
    }
  };

  const getDietaryBadge = (dietType) => {
    const badges = {
      vegetarian: { class: "badge-success", icon: "🥬" },
      vegan: { class: "badge-accent", icon: "🌱" },
      "non-vegetarian": { class: "badge-error", icon: "🍗" },
    };
    return badges[dietType?.toLowerCase()] || badges.vegetarian;
  };

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      Easy: "badge-success",
      Medium: "badge-warning",
      Hard: "badge-error",
    };
    return badges[difficulty] || "badge-neutral";
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

        {/* Save Meal Plan Input */}
        {!id && (
          <div className="card bg-base-100 shadow-lg p-6 mb-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Name Your Meal Plan</h2>
            <input
              type="text"
              className="input input-bordered w-full mb-4"
              placeholder="e.g. My Summer Fitness Plan"
              value={mealPlanName}
              onChange={(e) => setMealPlanName(e.target.value)}
            />
            <button
              className={`btn btn-primary w-full ${isSaving ? "loading" : ""}`}
              onClick={handleSaveMealPlan}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Meal Plan"}
            </button>
          </div>
        )}

        {/* Day Selector */}
        {daysOfWeek.length > 0 && (
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
        )}

        {/* Stats */}
        <div className="stats shadow mb-8 w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="stat-title">Selected Day</div>
            <div className="stat-value text-primary">{selectedDay}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <ChefHat className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Meals</div>
            <div className="stat-value text-secondary">
              {groupedMeals[selectedDay]?.length || 0}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <Users className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Calories</div>
            <div className="stat-value text-accent">{getTotalCalories()}</div>
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groupedMeals[selectedDay]?.map((meal, idx) => {
            const dietBadge = getDietaryBadge(meal.dietType);
            const difficultyBadge = getDifficultyBadge(meal.difficulty);

            return (
              <div
                key={idx}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-12 h-12">
                          <span className="text-2xl">{meal.emoji || "🍽️"}</span>
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
                                i < Math.floor(meal.rating || 4)
                                  ? "bg-orange-400"
                                  : "bg-gray-300"
                              }`}
                              disabled
                            />
                          ))}
                          <span className="text-sm text-base-content/70 ml-2">
                            {meal.rating || 4}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`badge ${dietBadge.class} gap-1`}>
                      <span>{dietBadge.icon}</span>
                      <span className="text-xs">
                        {meal.dietType?.replace("-", " ")}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-semibold text-base-content mb-4 leading-tight">
                    {meal.name}
                  </h4>

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

                  <div className="card-actions justify-between">
                    {/* <button className="btn btn-ghost btn-sm">
                      <Heart className="w-4 h-4" />
                    </button> */}
                    <button
                      onClick={() => handleMealClick(meal)}
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="alert alert-info">
            <span>
              🍽️ Healthy eating made simple with personalized meal planning
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyMealView;
