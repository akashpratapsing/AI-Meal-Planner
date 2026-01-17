import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getMealPlanById, saveMealPlan } from "../../services/mealService";
import toast from "react-hot-toast";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeeklyMealView = () => {
  const { id } = useParams();
  const location = useLocation();

  const [mealPlan, setMealPlan] = useState(null);
  const [mealPlanName, setMealPlanName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    // came from navigation with state
    if (location.state?.mealPlan) {
      const plan = location.state.mealPlan;
      setMealPlan(plan);
      setMealPlanName(plan.mealName || "");
      return; // ⛔ IMPORTANT: stop here
    }

    // direct URL / refresh
    if (!id) return;

    const fetchMealPlan = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getMealPlanById(id, token);
        setMealPlan(data);
        setMealPlanName(data.mealName || "");
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      }
    };

    fetchMealPlan();
  }, [id]); // ONLY id

  const normalizeTime = (t) => t?.toLowerCase().replace(/_/g, "-");

  if (!mealPlan) return <div className="p-10 text-lg">Loading...</div>;

  // Extract unique time slots
  const allTimes = Array.from(
    new Set(mealPlan.meals.map((m) => normalizeTime(m.time)))
  );

  // Build empty grid (7 days × N times)
  const mealGrid = Array(7)
    .fill(null)
    .map(() => {
      const obj = {};
      allTimes.forEach((t) => (obj[t] = null));
      return obj;
    });

  // Fill grid
  mealPlan.meals.forEach((meal) => {
    const dayIndex = dayNames.indexOf(meal.name);
    const timeKey = normalizeTime(meal.time);
    if (dayIndex >= 0) {
      mealGrid[dayIndex][timeKey] = meal;
    }
  });

  const openModal = (meal) => setSelectedMeal(meal);
  const closeModal = () => setSelectedMeal(null);

  const handleSaveMealPlan = async () => {
    if (!mealPlanName.trim()) return;

    const token = localStorage.getItem("token");
    setIsSaving(true);

    try {
      await saveMealPlan(
        {
          ...mealPlan,
          mealName: mealPlanName.trim(),
          generatedDate: new Date().toISOString(),
        },
        token
      );

      // Soft success feedback (no alert)
      setTimeout(() => {
        setIsSaving(false);
      }, 400);
      toast.success("Meal plan saved successfully!");
    } catch (err) {
      console.error(err);
      setIsSaving(false);
      toast.error("Failed to save meal plan.");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 px-4 md:px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold flex justify-center gap-3 items-center">
            <Calendar className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            Weekly Meal Plan
          </h1>
        </div>

        {/* Save Meal Plan Bar */}
        {!id && (
        <div className="top-20 z-20 mb-8">
          <div className="bg-base-200/70 backdrop-blur-md border border-base-300 rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <input
                type="text"
                placeholder="Give your meal plan a name (e.g. Fat Loss Week)"
                value={mealPlanName}
                onChange={(e) => setMealPlanName(e.target.value)}
                className="input input-bordered w-full sm:flex-1"
              />

              <button
                onClick={handleSaveMealPlan}
                disabled={isSaving || !mealPlanName.trim()}
                className="btn btn-primary min-w-[120px]"
              >
                {isSaving ? "Saving..." : "Save Plan"}
              </button>
            </div>

            <p className="text-xs text-base-content/60 mt-2">
              Saved plans appear in your dashboard for future reference.
            </p>
          </div>
        </div>
        )}

        {/* Desktop Grid View */}
        <div className="hidden lg:block overflow-x-auto">
          <div
            className="grid bg-base-100 border border-base-300 rounded-xl shadow-sm"
            style={{
              gridTemplateColumns: `150px repeat(${allTimes.length}, minmax(240px, 1fr))`,
            }}
          >
            {/* Header Row */}
            <div className="p-4 bg-base-200/60 border-b border-base-300 font-semibold">
              Day
            </div>
            {allTimes.map((time) => (
              <div
                key={time}
                className="p-4 bg-base-200/60 border-b border-base-300 font-semibold capitalize"
              >
                {time.replace(/-/g, " ")}
              </div>
            ))}

            {/* Daily rows */}
            {dayNames.map((day, dayIdx) => (
              <>
                {/* Day name */}
                <div
                  key={day}
                  className="p-4 bg-base-200/40 border-b border-base-300 font-bold"
                >
                  {day}
                </div>

                {/* Meal cards */}
                {allTimes.map((time) => {
                  const meal = mealGrid[dayIdx][time];
                  return (
                    <div
                      key={day + time}
                      className="p-4 border-b border-base-300"
                    >
                      {meal ? (
                        <div
                          onClick={() => openModal(meal)}
                          className="p-4 bg-base-100 rounded-xl border border-base-300 shadow-sm hover:shadow-md cursor-pointer transition"
                        >
                          <h3 className="font-semibold capitalize">
                            {meal.time.replace(/_/g, " ")}
                          </h3>
                          <p className="text-sm opacity-70 mt-1">
                            {meal.items.slice(0, 2).join(", ")}
                            {meal.items.length > 2 ? "…" : ""}
                          </p>
                          <p className="text-sm mt-2 opacity-80">
                            {meal.calories} cal • P{meal.protein} • C
                            {meal.carbs} • F{meal.fats}
                          </p>
                        </div>
                      ) : (
                        <div className="text-base-content/30 italic text-sm">
                          —
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>

        {/* Mobile List View */}
        <div className="lg:hidden space-y-6">
          {dayNames.map((day, dayIdx) => (
            <div
              key={day}
              className="card bg-base-100 border border-base-300 shadow-sm"
            >
              <div className="card-body p-4">
                <h3 className="text-xl font-bold text-primary mb-4 border-b border-base-200 pb-2">
                  {day}
                </h3>
                <div className="space-y-3">
                  {allTimes.map((time) => {
                    const meal = mealGrid[dayIdx][time];
                    if (!meal) return null;

                    return (
                      <div
                        key={time}
                        onClick={() => openModal(meal)}
                        className="bg-base-200/50 rounded-xl p-4 cursor-pointer hover:bg-base-200 transition border border-base-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="badge badge-primary badge-outline capitalize font-semibold">
                            {time.replace(/_/g, " ")}
                          </span>
                          <span className="text-xs font-bold opacity-70">
                            {meal.calories} kcal
                          </span>
                        </div>

                        <p className="text-sm opacity-80 mb-3 line-clamp-2">
                          {meal.items.join(", ")}
                        </p>

                        <div className="flex gap-3 text-xs opacity-60 font-mono">
                          <span>P: {meal.protein}g</span>
                          <span>C: {meal.carbs}g</span>
                          <span>F: {meal.fats}g</span>
                        </div>
                      </div>
                    );
                  })}
                  {allTimes.every((t) => !mealGrid[dayIdx][t]) && (
                    <div className="text-center py-4 opacity-50 italic text-sm">
                      No meals planned for this day
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedMeal && (
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="bg-base-100 max-w-lg w-full rounded-2xl shadow-xl p-6"
              >
                <h2 className="text-2xl font-bold capitalize">
                  {selectedMeal.time.replace(/_/g, " ")}
                </h2>
                <p className="text-base-content/60 mb-4">{selectedMeal.name}</p>

                <h3 className="font-semibold mb-2">Items</h3>
                <ul className="list-disc list-inside">
                  {selectedMeal.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <div className="grid grid-cols-4 gap-3 mt-6 text-center">
                  <div className="p-3 rounded-xl bg-info/10">
                    <p className="font-bold text-info">
                      {selectedMeal.calories}
                    </p>
                    <p className="text-xs opacity-70">Calories</p>
                  </div>
                  <div className="p-3 rounded-xl bg-success/10">
                    <p className="font-bold text-success">
                      {selectedMeal.protein}g
                    </p>
                    <p className="text-xs opacity-70">Protein</p>
                  </div>
                  <div className="p-3 rounded-xl bg-warning/10">
                    <p className="font-bold text-warning">
                      {selectedMeal.carbs}g
                    </p>
                    <p className="text-xs opacity-70">Carbs</p>
                  </div>
                  <div className="p-3 rounded-xl bg-accent/10">
                    <p className="font-bold text-accent">
                      {selectedMeal.fats}g
                    </p>
                    <p className="text-xs opacity-70">Fats</p>
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

export default WeeklyMealView;
