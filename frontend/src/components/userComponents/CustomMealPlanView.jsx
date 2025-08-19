import { useParams } from "react-router-dom";
import { getCustomMealPlanById } from "../../services/customMealService";
import { useEffect, useState } from "react";

const CustomMealPlanView = () => {
  const { id } = useParams();
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanById = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        await new Promise((resolve) => setTimeout(resolve, 300)); // Small delay for UX feel

        const plan = await getCustomMealPlanById(id, token);
        setMealPlan(plan);
      } catch (err) {
        console.error("Error fetching custom meal plan by ID:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanById();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-lg font-medium text-base-content">
            Loading your custom meal plan...
          </p>
        </div>
      </div>
    );
  }

  if (!mealPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            Meal Plan Not Found
          </h2>
          <p className="text-base-content/70">
            The meal plan you're looking for doesn't exist or has been removed.
          </p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="text-5xl mb-4">🍽️</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {mealPlan.mealPlanName}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm opacity-90">
              <div className="badge badge-lg bg-white/20 text-white border-white/30">
                📅 {mealPlan.mealsPerDay} meals per day
              </div>
              <div className="badge badge-lg bg-white/20 text-white border-white/30">
                🗓️ Created {new Date(mealPlan.createdDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="stat bg-base-100 shadow-lg rounded-2xl">
            <div className="stat-figure text-primary">
              <div className="text-3xl">🍴</div>
            </div>
            <div className="stat-title">Total Meals</div>
            <div className="stat-value text-primary">
              {mealPlan.selectedMeals.length}
            </div>
            <div className="stat-desc">Delicious recipes selected</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-2xl">
            <div className="stat-figure text-secondary">
              <div className="text-3xl">📊</div>
            </div>
            <div className="stat-title">Meals per Day</div>
            <div className="stat-value text-secondary">
              {mealPlan.mealsPerDay}
            </div>
            <div className="stat-desc">Perfectly planned</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-2xl">
            <div className="stat-figure text-accent">
              <div className="text-3xl">⭐</div>
            </div>
            <div className="stat-title">Plan Status</div>
            <div className="stat-value text-accent text-sm">Active</div>
            <div className="stat-desc">Ready to enjoy</div>
          </div>
        </div>

        {/* Meals Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-base-content">
            Your Selected Meals
          </h2>
          <p className="text-center text-base-content/70 mb-8">
            A carefully curated collection of delicious recipes just for you
          </p>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealPlan.selectedMeals.map((meal, index) => (
            <div
              key={meal.idMeal}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <figure className="relative overflow-hidden">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <div className="badge badge-primary badge-lg font-bold">
                    #{index + 1}
                  </div>
                </div>
              </figure>

              <div className="card-body p-6">
                <h3 className="card-title text-lg font-bold text-base-content mb-2 line-clamp-2">
                  {meal.strMeal}
                </h3>

                <div className="flex items-center gap-2 text-sm text-base-content/60 mb-4">
                  <div className="badge badge-outline badge-sm">
                    ID: {meal.idMeal}
                  </div>
                </div>

                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    View Recipe
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {/* <div className="flex flex-wrap justify-center gap-4 mt-12">
          <button className="btn btn-primary btn-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Plan
          </button>

          <button className="btn btn-secondary btn-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            Share Plan
          </button>

          <button className="btn btn-outline btn-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Plan
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CustomMealPlanView;
