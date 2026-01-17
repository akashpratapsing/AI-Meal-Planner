import React, { useEffect, useState } from "react";
import { Heart, Trash2, ArrowRight, X, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  deleteFavoriteMeal,
  getFavoriteMeals,
} from "../../services/favMealService";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import UpgradeBanner from "./UpgradeBanner";
import { useSubscription } from "../../context/SubscriptionContext";

const FavoriteMealSection = () => {
  const { user } = useAuth();
  const { features, loading: subscriptionLoading } = useSubscription();

  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?.userId) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const data = await getFavoriteMeals(token);
        setMeals(data);
      } catch {
        toast.error("Failed to load favorite meals");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user?.userId]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      await deleteFavoriteMeal(id, token);
      setMeals((prev) => prev.filter((m) => m.id !== id));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Failed to remove meal");
    }
  };

  if (subscriptionLoading) return null;

  // 🚫 PRO only
  if (!features.has("FAVORITE_MEAL")) {
    return (
      <UpgradeBanner
        title="Favorites are a PRO feature"
        description="Save and manage your favorite meals with PRO access."
      />
    );
  }

  // ⏳ Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Heart className="text-primary fill-primary" />
              Favorite Meals
            </h1>
            <p className="text-base-content/60">
              Your saved meals, always ready
            </p>
          </div>

          <div className="badge badge-primary badge-outline">
            {meals.length} saved
          </div>
        </div>

        {/* Empty state */}
        {!meals.length && (
          <div className="text-center py-20 bg-base-100 rounded-3xl border">
            <Heart className="mx-auto mb-4 text-base-content/30" size={40} />
            <h3 className="font-bold text-xl mb-2">No favorites yet</h3>
            <p className="text-base-content/60 mb-6">
              Browse meals and save your favorites here.
            </p>
            <Link to="/dashboard/browse" className="btn btn-primary">
              Browse Meals <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {meals.map((meal) => (
              <motion.div
                key={meal.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="group relative bg-base-100 rounded-2xl border border-base-200 shadow-sm hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedMeal(meal)}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={meal.thumbnail}
                    alt={meal.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

                  {/* Delete button (intent-based) */}
                  <button
                    className="absolute top-3 right-3 btn btn-xs btn-circle bg-base-100/90 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error hover:text-white"
                    onClick={(e) => handleDelete(e, meal.id)}
                    title="Remove from favorites"
                  >
                    <Trash2 size={14} />
                  </button>

                  {/* Category badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="badge badge-sm badge-primary badge-outline bg-base-100/90">
                      {meal.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-1">
                  <h3 className="font-semibold text-base-content line-clamp-1 group-hover:text-primary transition-colors">
                    {meal.name}
                  </h3>

                  <p className="text-xs text-base-content/60">{meal.area}</p>
                </div>

                {/* Hover affordance */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMeal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMeal(null)}
          >
            <motion.div
              className="relative bg-base-100 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative">
                <img
                  src={selectedMeal.thumbnail}
                  alt={selectedMeal.name}
                  className="w-full h-56 object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Title on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white leading-tight">
                    {selectedMeal.name}
                  </h2>
                  <p className="text-sm text-white/80">
                    {selectedMeal.category} • {selectedMeal.area}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-3 text-base-content">
                    <ChefHat size={18} className="text-primary" />
                    Ingredients
                  </h4>

                  <div className="bg-base-200/50 rounded-xl p-4">
                    <ul className="space-y-2 text-sm">
                      {selectedMeal.ingredients.map((i, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center"
                        >
                          <span className="text-base-content">
                            {i.ingredient}
                          </span>
                          <span className="text-base-content/60">
                            {i.measure}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-6 pb-6 flex justify-end gap-3">
                <button
                  className="btn btn-error btn-outline btn-sm"
                  onClick={(e) => {
                    handleDelete(e, selectedMeal.id);
                    setSelectedMeal(null);
                  }}
                >
                  Remove from Favorites
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FavoriteMealSection;
