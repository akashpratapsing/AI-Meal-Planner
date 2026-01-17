import { useState, useEffect } from "react";

const MealPlanPreview = () => {
  const [activeDay, setActiveDay] = useState(0);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const mealData = [
    {
      breakfast: { name: "Oats + Berries", icon: "🥣", cal: 320 },
      lunch: { name: "Grilled Chicken", icon: "🍗", cal: 580 },
      dinner: { name: "Salmon Bowl", icon: "🥗", cal: 520 },
      total: 1420,
      macros: { protein: 98, carbs: 145, fats: 42 },
    },
    {
      breakfast: { name: "Scrambled Eggs", icon: "🍳", cal: 280 },
      lunch: { name: "Quinoa Salad", icon: "🥙", cal: 520 },
      dinner: { name: "Steak & Veggies", icon: "🥩", cal: 620 },
      total: 1420,
      macros: { protein: 105, carbs: 132, fats: 48 },
    },
    {
      breakfast: { name: "Greek Yogurt", icon: "🥛", cal: 240 },
      lunch: { name: "Turkey Wrap", icon: "🌯", cal: 480 },
      dinner: { name: "Pasta Primavera", icon: "🍝", cal: 560 },
      total: 1280,
      macros: { protein: 82, carbs: 168, fats: 38 },
    },
    {
      breakfast: { name: "Protein Pancakes", icon: "🥞", cal: 350 },
      lunch: { name: "Tuna Poke Bowl", icon: "🍜", cal: 540 },
      dinner: { name: "Chicken Curry", icon: "🍛", cal: 590 },
      total: 1480,
      macros: { protein: 112, carbs: 152, fats: 45 },
    },
    {
      breakfast: { name: "Avocado Toast", icon: "🥑", cal: 320 },
      lunch: { name: "Caesar Salad", icon: "🥗", cal: 450 },
      dinner: { name: "Grilled Fish", icon: "🐟", cal: 510 },
      total: 1280,
      macros: { protein: 88, carbs: 138, fats: 52 },
    },
  ];

  const currentMeal = mealData[activeDay];
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveDay((prev) => (prev + 1) % days.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, days.length]);

  return (
    <div className="relative hidden lg:flex items-center justify-center h-[520px]">
      {/* Animated background elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[400px] h-[400px] bg-primary/10 blur-3xl rounded-full animate-pulse" />
        <div
          className="absolute w-[300px] h-[300px] bg-accent/10 blur-3xl rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Floating small cards */}
      <div className="absolute top-8 left-12 animate-floatSlow">
        <div className="bg-success/10 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-success/20">
          <div className="text-2xl mb-1">💪</div>
          <div className="text-xs font-semibold text-success">
            Goal: Weight Loss
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-12 right-8 animate-floatSlow"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="bg-info/10 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-info/20">
          <div className="text-2xl mb-1">📊</div>
          <div className="text-xs font-semibold text-info">Track Progress</div>
        </div>
      </div>

      {/* Main Card */}
      <div
        className="relative z-10 animate-floatSlow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl rounded-3xl opacity-60" />

        {/* Card */}
        <div className="relative bg-base-100 rounded-3xl shadow-2xl border border-base-200 w-[420px] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-xl text-primary-content">
                Weekly Meal Plan
              </h3>
              <span className="badge badge-secondary text-xs font-bold px-3 py-3">
                PRO
              </span>
            </div>

            {/* Day Selector */}
            <div className="flex gap-2">
              {days.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    i === activeDay
                      ? "bg-base-100 text-primary shadow-lg scale-105"
                      : "bg-primary/20 text-primary-content/70 hover:bg-primary/30"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Meals */}
          <div className="p-6 space-y-3">
            {[
              { label: "Breakfast", data: currentMeal.breakfast },
              { label: "Lunch", data: currentMeal.lunch },
              { label: "Dinner", data: currentMeal.dinner },
            ].map((meal, i) => (
              <div
                key={i}
                className="group flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-base-200/80 to-base-200/40 hover:from-primary/10 hover:to-accent/10 transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {meal.data.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-base-content">
                      {meal.label}
                    </div>
                    <div className="text-sm text-base-content/70">
                      {meal.data.name}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{meal.data.cal}</div>
                  <div className="text-xs text-base-content/60">kcal</div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-r from-neutral/50 to-neutral/30 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-base-content/80">
                  Daily Total
                </span>
                <span className="text-xl font-bold text-primary flex items-center gap-1">
                  🔥 {currentMeal.total} kcal
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-base-100/50 rounded-xl p-2">
                  <div className="text-xs text-base-content/60 mb-1">
                    Protein
                  </div>
                  <div className="font-bold text-success">
                    {currentMeal.macros.protein}g
                  </div>
                </div>
                <div className="bg-base-100/50 rounded-xl p-2">
                  <div className="text-xs text-base-content/60 mb-1">Carbs</div>
                  <div className="font-bold text-warning">
                    {currentMeal.macros.carbs}g
                  </div>
                </div>
                <div className="bg-base-100/50 rounded-xl p-2">
                  <div className="text-xs text-base-content/60 mb-1">Fats</div>
                  <div className="font-bold text-info">
                    {currentMeal.macros.fats}g
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanPreview;
