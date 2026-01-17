import React, { useEffect, useState } from "react";
import {
  Heart,
  RefreshCw,
  Clock,
  MapPin,
  Tag,
  ChefHat,
  Lock,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getRandomMeal } from "../../services/mealDBService";
import { useSubscription } from "../../context/SubscriptionContext";
import { AnimatePresence, motion} from "framer-motion";

const SuggestedMeal = () => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const { features, usage, loading: subLoading } = useSubscription();

  const RANDOM_MEAL_DAILY_LIMIT = 2;

  const usedRandomMealsToday = usage.RANDOM_MEAL_TODAY || 0;
  const hasRandomMealFeature = features.has("RANDOM_MEAL");

  // PRO = unlimited
  const isPro = features.has("BROWSE_MEALS");

  const randomMealLimitReached =
    !isPro && usedRandomMealsToday >= RANDOM_MEAL_DAILY_LIMIT;

  // Fetch random meal FROM BACKEND
  const fetchRandomMeal = async () => {
    if (subLoading) return;

    if (!hasRandomMealFeature) {
      toast.error("Upgrade to PRO to get meal suggestions");
      setLoading(false);
      return;
    }

    if (randomMealLimitReached) {
      toast.error("Daily meal suggestion limit reached. Upgrade to PRO.");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const rawMeal = await getRandomMeal();

      // Extract ingredients
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ing = rawMeal[`strIngredient${i}`];
        const meas = rawMeal[`strMeasure${i}`];
        if (ing && ing.trim()) {
          ingredients.push(`${meas?.trim()} ${ing.trim()}`);
        }
      }

      const formattedMeal = {
        id: rawMeal.idMeal,
        name: rawMeal.strMeal,
        image: rawMeal.strMealThumb,
        instructions: rawMeal.strInstructions,
        tags: rawMeal.strTags ? rawMeal.strTags.split(",") : [],
        ingredients,
        category: rawMeal.strCategory,
        area: rawMeal.strArea,
      };

      setMeal(formattedMeal);
    } catch (err) {
      console.error("Error loading random meal:", err);
      if (err.response?.status === 429) {
        toast.error("Daily limit reached. Upgrade to PRO.");
      } else if (err.response?.status === 403) {
        toast.error("Upgrade to PRO to use this feature.");
      } else {
        toast.error("Failed to fetch random meal.");
      }
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (!subLoading) fetchRandomMeal();
  }, [subLoading]);

  if (!meal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          {randomMealLimitReached ? (
            <>
              <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-base-content/40" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Daily Limit Reached</h2>
              <p className="text-base-content/60 mb-6">
                You've used all your free meal suggestions for today. Upgrade to
                PRO for unlimited access.
              </p>
              <Link to="/dashboard/pricing" className="btn btn-primary">
                Upgrade to PRO
              </Link>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-base-content/40" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
              <p className="text-base-content/60 mb-6">
                We couldn't load a meal suggestion. Please try again.
              </p>
              <button className="btn btn-primary" onClick={fetchRandomMeal}>
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            🍽️ Meal Suggestion
          </h1>
          <p className="text-base-content/60">
            Discover your next delicious adventure
          </p>
        </div>
        {/* Main Card */}
        <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
          <div className="md:flex">
            {/* Image */}
            <div className="md:w-1/2 relative group">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-96 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="badge badge-primary badge-lg">#{meal.id}</div>
              </div>

              <h2 className="text-3xl font-bold text-base-content mb-4">
                {meal.name}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-base-content/60">
                  <ChefHat className="w-5 h-5 text-primary" />
                  <span className="font-medium">Category:</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                    {meal.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-base-content/60">
                  <MapPin className="w-5 h-5 text-info" />
                  <span className="font-medium">Origin:</span>
                  <span className="bg-info/10 text-info px-2 py-1 rounded-full text-sm">
                    {meal.area}
                  </span>
                </div>
              </div>

              {meal.tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-base-content/60">
                      Tags:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {meal.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="badge badge-outline badge-sm hover:badge-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="btn btn-outline btn-lg flex-1"
                  onClick={fetchRandomMeal}
                  disabled={
                    loading ||
                    subLoading ||
                    !hasRandomMealFeature ||
                    randomMealLimitReached
                  }
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  {loading
                    ? "Fetching..."
                    : !hasRandomMealFeature
                    ? "Upgrade to PRO"
                    : randomMealLimitReached
                    ? "Limit reached — Upgrade"
                    : "Try Another"}
                </button>

                <button
                  className="btn btn-primary btn-lg flex-1"
                  onClick={() => setShowModal(true)}
                >
                  <Clock className="w-5 h-5 mr-2" /> View Recipe
                </button>
              </div>
              {!isPro && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  {usedRandomMealsToday}/{RANDOM_MEAL_DAILY_LIMIT} meal
                  suggestions used today
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recipe Modal */}
        <AnimatePresence>
          {showModal && (
            // 🔲 Backdrop
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)} // ⬅️ click outside closes
            >
              {/* 🧱 Modal box */}
              <motion.div
                className="bg-base-100 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                onClick={(e) => e.stopPropagation()} // ⛔ stop backdrop click
              >
                {/* Header */}
                <div className="sticky top-0 bg-base-100 border-b border-base-200 p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-base-content">
                      {meal.name}
                    </h3>
                    <p className="text-base-content/60 mt-1">
                      {meal.category} • {meal.area}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 grid md:grid-cols-2 gap-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                  {/* Ingredients */}
                  <div>
                    <h4 className="font-bold text-lg mb-4">Ingredients</h4>
                    <div className="space-y-2">
                      {meal.ingredients.map((item, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-xl bg-base-200/60 text-sm"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h4 className="font-bold text-lg mb-4">Instructions</h4>
                    <p className="leading-relaxed whitespace-pre-line text-base-content/80">
                      {meal.instructions}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SuggestedMeal;
