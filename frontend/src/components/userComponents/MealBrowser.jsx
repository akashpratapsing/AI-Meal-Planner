import React, { useEffect, useState } from "react";
import { Search, ChefHat, Users, Star, Filter } from "lucide-react";
import {
  getMealOptions,
  browseMeals,
  getMealDetails,
} from "../../services/mealDBService";
import { useSubscription } from "../../context/SubscriptionContext";
import UpgradeBanner from "./UpgradeBanner";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { addFavoriteMeal } from "../../services/favMealService";

const MealBrowser = () => {
  const { features, loading } = useSubscription();
  const [availableMeals, setAvailableMeals] = useState([]);
  const [filterType, setFilterType] = useState("category");
  const [filterOptions, setFilterOptions] = useState({
    category: [],
    area: [],
    ingredient: [],
    letter: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  });

  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [isLoadingMeals, setIsLoadingMeals] = useState(false);

  // Meal Detail Modal
  const [selectedMealDetails, setSelectedMealDetails] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // Load dropdown options once
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await getMealOptions();
        setFilterOptions((prev) => ({
          ...prev,
          category: data.category || [],
          area: data.area || [],
          ingredient: data.ingredient || [],
        }));
      } catch (err) {
        // console.error("Failed loading filter options:", err.message);
        toast.error("Failed to load filter options.");
      }
    };
    loadOptions();
  }, []);

  // Reset UI on filter change
  useEffect(() => {
    setSelectedFilter("");
    setSearchName("");
    setAvailableMeals([]);
  }, [filterType]);

  const handleSearch = async () => {
    setIsLoadingMeals(true);

    try {
      let meals =
        filterType === "name"
          ? await browseMeals("name", searchName)
          : await browseMeals(filterType, selectedFilter);

      setAvailableMeals(meals);
    } catch (err) {
      // console.error("Search failed:", err.message);
      toast.error("Search failed.");
    } finally {
      setIsLoadingMeals(false);
    }
  };

  const openMealDetails = async (idMeal) => {
    setIsDetailLoading(true);
    try {
      const details = await getMealDetails(idMeal);
      console.log(details);
      setSelectedMealDetails(details);
    } catch (err) {
      // console.error("Failed loading meal details:", err.message);
      toast.error("Failed to load meal details.");
    } finally {
      setIsDetailLoading(false);
    }
  };

  const closeModal = () => setSelectedMealDetails(null);

  const getFilterIcon = (type) => {
    switch (type) {
      case "category":
        return <Filter className="w-4 h-4" />;
      case "area":
        return <Users className="w-4 h-4" />;
      case "ingredient":
        return <Star className="w-4 h-4" />;
      case "letter":
      case "name":
        return <Search className="w-4 h-4" />;
      default:
        return <Filter className="w-4 h-4" />;
    }
  };

  const [isSavingFavorite, setIsSavingFavorite] = useState(false);

  const handleAddToFavorite = async (e) => {
    e.stopPropagation();

    if (!features.has("FAVORITE_MEAL")) {
      toast.error("Upgrade to PRO to save favorites");
      return;
    }

    try {
      setIsSavingFavorite(true);
      const token = localStorage.getItem("token");

      await addFavoriteMeal(
        {
          idMeal: selectedMealDetails.idMeal,
          strMeal: selectedMealDetails.strMeal,
          strMealThumb: selectedMealDetails.strMealThumb,
          strCategory: selectedMealDetails.strCategory,
          strArea: selectedMealDetails.strArea,
          ingredients: selectedMealDetails.ingredients,
        },
        token,
      );

      toast.success("Added to favorites ❤️");
    } catch (err) {
      if (err.response?.status === 409) {
        toast("Already in favorites");
      } else {
        toast.error("Failed to add favorite");
      }
    } finally {
      setIsSavingFavorite(false);
    }
  };

  if (loading) return null;

  if (!features.has("BROWSE_MEALS")) {
    return <UpgradeBanner />;
  }

  return (
    <div className="min-h-screen bg-base-200 px-3 py-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ChefHat className="w-9 h-9 md:w-12 md:h-12 text-primary" />
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Meal Browser
            </h1>
          </div>
          <p className="text-base-content/60 text-sm md:text-lg">
            Explore delicious meals from around the world
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-base-100 rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            Find Meals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filter Type */}
            <div className="form-control">
              <label className="label text-sm md:text-base">
                Search Method
              </label>
              <select
                className="select select-bordered w-full"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="category">By Category</option>
                <option value="area">By Cuisine</option>
                <option value="ingredient">By Ingredient</option>
                <option value="letter">By Letter</option>
                <option value="name">By Name</option>
              </select>
            </div>

            {/* Input */}
            {filterType === "name" ? (
              <div className="form-control">
                <label className="label text-sm md:text-base">Meal Name</label>
                <input
                  className="input input-bordered w-full"
                  placeholder="Search by name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            ) : (
              <div className="form-control">
                <label className="label text-sm md:text-base">
                  Select {filterType}
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="">Choose...</option>
                  {(filterOptions[filterType] || []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Search Button */}
            <div className="form-control">
              <label className="label text-sm md:text-base">Action</label>
              <button
                className="btn btn-primary w-full gap-2"
                onClick={handleSearch}
                disabled={
                  isLoadingMeals ||
                  (filterType === "name" && !searchName.trim()) ||
                  (filterType !== "name" &&
                    !selectedFilter &&
                    filterType !== "letter")
                }
              >
                {getFilterIcon(filterType)}
                {isLoadingMeals ? "Loading..." : "Search"}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-3 flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" />
            Available Meals
            {availableMeals.length > 0 && (
              <span className="badge badge-primary badge-md md:badge-lg">
                {availableMeals.length}
              </span>
            )}
          </h3>

          {isLoadingMeals ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-lg text-primary"></span>
            </div>
          ) : availableMeals.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {availableMeals.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="card bg-base-100 shadow-md hover:shadow-xl cursor-pointer transition-all rounded-xl"
                  onClick={() => openMealDetails(meal.idMeal)}
                >
                  <figure className="px-3 pt-3">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="rounded-xl h-32 sm:h-40 md:h-48 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body p-3">
                    <h4 className="font-semibold text-xs sm:text-sm md:text-base line-clamp-2">
                      {meal.strMeal}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-base-content/50">
              No meals found.
            </div>
          )}
        </div>

        {/* Meal Detail Modal */}
        <AnimatePresence>
          {selectedMealDetails && (
            // 🌫 Backdrop
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal} // ⬅️ click anywhere outside
            >
              {/* 📦 Modal box */}
              <motion.div
                className="relative bg-base-100 w-full max-w-full sm:max-w-xl md:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 24 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                onClick={(e) => e.stopPropagation()} // ⛔ prevent backdrop close
              >
                {/* ⏳ Loading */}
                {isDetailLoading ? (
                  <div className="py-16 flex justify-center">
                    <span className="loading loading-lg"></span>
                  </div>
                ) : (
                  <div className="p-6 md:p-8">
                    {/* Title + Actions */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h2 className="text-xl md:text-3xl font-bold">
                        {selectedMealDetails.strMeal}
                      </h2>

                      <button
                        onClick={handleAddToFavorite}
                        disabled={isSavingFavorite}
                        className="btn btn-sm btn-outline btn-primary rounded-full flex gap-2"
                      >
                        <Heart
                          size={16}
                          className={isSavingFavorite ? "animate-pulse" : ""}
                        />
                        {isSavingFavorite ? "Saving..." : "Add to Favorites"}
                      </button>
                    </div>

                    {/* Image */}
                    <img
                      src={selectedMealDetails.strMealThumb}
                      alt={selectedMealDetails.strMeal}
                      className="rounded-xl mb-6 w-full max-h-72 object-cover"
                    />

                    {/* Instructions */}
                    <h3 className="font-semibold text-lg mb-2">Instructions</h3>
                    <p className="text-sm md:text-base whitespace-pre-line leading-relaxed text-base-content/80">
                      {selectedMealDetails.strInstructions}
                    </p>

                    {/* Ingredients */}
                    <h3 className="font-semibold text-lg mt-6 mb-3">
                      Ingredients
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {Object.keys(selectedMealDetails)
                        .filter(
                          (k) =>
                            k.startsWith("strIngredient") &&
                            selectedMealDetails[k],
                        )
                        .map((key) => {
                          const i = key.replace("strIngredient", "");
                          const ingredient = selectedMealDetails[key];
                          const measure = selectedMealDetails[`strMeasure${i}`];

                          return (
                            <div
                              key={key}
                              className="flex justify-between items-center border-b border-base-200 pb-1"
                            >
                              <span>{ingredient}</span>
                              <span className="text-base-content/60">
                                {measure}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MealBrowser;
