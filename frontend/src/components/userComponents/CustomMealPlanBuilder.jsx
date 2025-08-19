import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { saveCustomMealPlan } from "../../services/customMealService";
import {
  Plus,
  X,
  Search,
  ChefHat,
  Clock,
  Users,
  Star,
  Filter,
} from "lucide-react";

const CustomMealPlanBuilder = () => {
  const [mealPlanName, setMealPlanName] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [filterType, setFilterType] = useState("category");
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isLoadingMeals, setIsLoadingMeals] = useState(false);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [cRes, aRes, iRes] = await Promise.all([
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list"),
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list"),
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list"),
        ]);

        setFilterOptions({
          category: cRes.data.meals.map((m) => m.strCategory),
          area: aRes.data.meals.map((m) => m.strArea),
          ingredient: iRes.data.meals.map((m) => m.strIngredient),
          letter: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
        });
      } catch (e) {
        console.error("Error fetching filter options:", e);
      }
    };

    fetchOptions();
  }, []);

  const addMealToPlan = (meal) => {
    if (selectedMeals.length >= mealsPerDay) {
      alert(`Maximum ${mealsPerDay} meals allowed per day`);
      return;
    }
    if (!selectedMeals.some((m) => m.idMeal === meal.idMeal)) {
      setSelectedMeals([...selectedMeals, meal]);
      // alert(`Added ${meal.strMeal} to your plan!`);
    } else {
      alert("Meal already added to plan");
    }
  };

  const removeMealFromPlan = (id) => {
    setSelectedMeals((prev) => prev.filter((m) => m.idMeal !== id));
    alert("Meal removed from plan");
  };

  const handleFilterChange = async (type, value) => {
    setFilterType(type);
    setSelectedFilter(value);
    setIsLoadingMeals(true);

    let url = "";
    switch (type) {
      case "category":
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
          value
        )}`;
        break;
      case "area":
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(
          value
        )}`;
        break;
      case "ingredient":
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
          value
        )}`;
        break;
      case "letter":
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${encodeURIComponent(
          value
        )}`;
        break;
      default:
        return;
    }

    try {
      const res = await axios.get(url);
      setAvailableMeals(res.data.meals || []);
    } catch (e) {
      console.error("API error:", e);
    } finally {
      setIsLoadingMeals(false);
    }
  };

  const handleNameSearch = async (name) => {
    setFilterType("name");
    setSelectedFilter(name);
    setIsLoadingMeals(true);

    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          name
        )}`
      );
      setAvailableMeals(res.data.meals || []);
    } catch (e) {
      console.error("Name search error:", e);
    } finally {
      setIsLoadingMeals(false);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    const decoded = jwtDecode(token);
    const userId = decoded?.id || decoded?.user?.id;
    if (!userId) {
      toast.error("User ID not found in token.");
      return;
    }

    const plan = {
      userId,
      mealPlanName,
      mealsPerDay,
      selectedMeals,
    };

    try {
      await saveCustomMealPlan(plan, token);
      toast.success("Meal plan saved!");
      console.log("saved Meal Plan : ", plan);
      setMealPlanName("");
      setSelectedMeals([]);
    } catch (e) {
      toast.error("Failed to save meal plan");
    }
  };

  const getFilterIcon = (type) => {
    switch (type) {
      case "category":
        return <Filter className="w-4 h-4" />;
      case "area":
        return <Users className="w-4 h-4" />;
      case "ingredient":
        return <Star className="w-4 h-4" />;
      case "letter":
        return <Search className="w-4 h-4" />;
      default:
        return <Filter className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-50 via-base-100 to-base-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-10 h-10 text-orange-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Custom Meal Plan Builder
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Create your perfect meal plan with delicious recipes from around the
            world
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
          {/* Plan Configuration */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-600" />
              Plan Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Plan Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your meal plan name..."
                  className="input input-bordered input-lg w-full focus:input-primary transition-all duration-200"
                  value={mealPlanName}
                  onChange={(e) => setMealPlanName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Meals Per Day</span>
                </label>
                <select
                  className="select select-bordered select-lg w-full focus:select-primary transition-all duration-200"
                  value={mealsPerDay}
                  onChange={(e) => setMealsPerDay(+e.target.value)}
                >
                  {[2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} meals per day
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Search className="w-6 h-6 text-orange-600" />
              Find Meals
            </h2>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Search Method
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full focus:select-primary"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="category">By Category</option>
                    <option value="area">By Cuisine</option>
                    <option value="ingredient">By Ingredient</option>
                    <option value="letter">By Alphabet</option>
                    <option value="name">By Name</option>
                  </select>
                </div>

                {filterType === "name" ? (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Meal Name</span>
                    </label>
                    <input
                      className="input input-bordered w-full focus:input-primary"
                      placeholder="Search by meal name..."
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleNameSearch(searchName)
                      }
                    />
                  </div>
                ) : (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Select {filterType}
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full focus:select-primary"
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    >
                      <option value="">Choose {filterType}...</option>
                      {(filterOptions[filterType] || []).map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Action</span>
                  </label>
                  <button
                    className="btn btn-primary btn-lg gap-2"
                    onClick={() =>
                      filterType === "name"
                        ? handleNameSearch(searchName)
                        : handleFilterChange(filterType, selectedFilter)
                    }
                    disabled={
                      isLoadingMeals ||
                      (filterType !== "name" && !selectedFilter)
                    }
                  >
                    {getFilterIcon(filterType)}
                    {isLoadingMeals ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Loading...
                      </>
                    ) : (
                      "Search Meals"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Browse Meals */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-600" />
              Available Meals
              {availableMeals.length > 0 && (
                <span className="badge badge-primary badge-lg">
                  {availableMeals.length}
                </span>
              )}
            </h3>

            {isLoadingMeals ? (
              <div className="flex items-center justify-center py-12">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableMeals.map((meal) => (
                  <div
                    key={meal.idMeal}
                    className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <figure className="px-4 pt-4">
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="rounded-xl w-full h-48 object-cover"
                      />
                    </figure>
                    <div className="card-body p-4">
                      <h4 className="card-title text-sm font-medium line-clamp-2">
                        {meal.strMeal}
                      </h4>
                      <div className="card-actions justify-end mt-2">
                        <button
                          className="btn btn-success btn-sm gap-1"
                          onClick={() => addMealToPlan(meal)}
                          disabled={selectedMeals.some(
                            (m) => m.idMeal === meal.idMeal
                          )}
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoadingMeals && availableMeals.length === 0 && (
              <div className="text-center py-12">
                <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No meals found. Try a different search!
                </p>
              </div>
            )}
          </div>

          {/* Selected Meals */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-orange-600" />
              Your Meal Plan
              <span className="badge badge-accent badge-lg">
                {selectedMeals.length}/{mealsPerDay}
              </span>
            </h3>

            {selectedMeals.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-2xl">
                <div className="text-gray-400 mb-2">
                  <Clock className="w-12 h-12 mx-auto mb-2" />
                </div>
                <p className="text-gray-500">
                  No meals selected yet. Start building your perfect meal plan!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedMeals.map((meal, idx) => (
                  <div
                    key={meal.idMeal}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="badge badge-primary badge-sm">
                          Meal {idx + 1}
                        </span>
                        <span className="font-medium">{meal.strMeal}</span>
                      </div>
                    </div>
                    <button
                      className="btn btn-ghost btn-sm btn-circle text-red-500 hover:bg-red-50"
                      onClick={() => removeMealFromPlan(meal.idMeal)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={
                selectedMeals.length !== mealsPerDay || !mealPlanName.trim()
              }
              className="btn btn-accent btn-lg gap-2 px-8"
            >
              <ChefHat className="w-5 h-5" />
              Save Meal Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMealPlanBuilder;
