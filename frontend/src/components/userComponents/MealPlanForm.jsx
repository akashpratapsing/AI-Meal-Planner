import React, { useState } from "react";
import {
  ChevronDown,
  Plus,
  X,
  Target,
  User,
  Clock,
  DollarSign,
  Globe,
  Heart,
  Activity,
  Utensils,
  AlertCircle,
  ChefHat,
  Scale,
  Ruler,
} from "lucide-react";
import { generateMealPlan } from "../../services/mealService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSubscription } from "../../context/SubscriptionContext";

const MealPlanForm = () => {
  const [formData, setFormData] = useState({
    targetCalories: "",
    targetProtein: "",
    targetCarbs: "",
    targetFats: "",
    dietType: "",
    allergies: [],
    restrictions: [],
    mealsPerDay: "3",
    mealTimes: [],
    age: "",
    sex: "",
    weight: "",
    height: "",
    healthGoal: "",
    activityLevel: "",
    maxPrepTime: "",
    budget: "",
    availableIngredients: [],
    wantDiverseMeals: false,
    preferredCuisines: [],
  });

  const [newAllergy, setNewAllergy] = useState("");
  const [newRestriction, setNewRestriction] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const { features, usage, loading: subLoading } = useSubscription();

  const MEAL_PLAN_LIMIT = 3;

  const usedMealPlans = usage.CREATE_MEAL_PLAN || 0;
  const hasCreateFeature = features.has("CREATE_MEAL_PLAN");

  // PRO users have unlimited
  const isPro = features.has("BROWSE_MEALS");

  // FREE limit reached?
  const mealPlanLimitReached = !isPro && usedMealPlans >= MEAL_PLAN_LIMIT;

  const navigate = useNavigate();

  const dietTypes = [
    "All Meals","Vegetarian","Vegan","Keto","Paleo","Mediterranean","Low Carb","Gluten-Free"
  ];
  const healthGoals = [
    "Weight Loss","Muscle Gain","Maintain Weight","Improve Health","Athletic Performance"
  ];
  const activityLevels = [
    "Sedentary","Lightly Active","Moderately Active","Very Active","Extremely Active"
  ];
  const cuisineTypes = [
    "Italian","Mexican","Asian","Mediterranean","American","Indian","Thai","Greek","Japanese","French"
  ];
  const mealTimeOptions = [
    "Breakfast","Mid-Morning Snack","Lunch","Afternoon Snack","Dinner","Evening Snack"
  ];

  const addToList = (listName, value, setter) => {
    if (value.trim()) {
      setFormData((prev) => ({ ...prev, [listName]: [...prev[listName], value.trim()] }));
      setter("");
    }
  };

  const removeFromList = (listName, index) => {
    setFormData((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMealTime = (mealTime) => {
    setFormData((prev) => ({
      ...prev,
      mealTimes: prev.mealTimes.includes(mealTime)
        ? prev.mealTimes.filter((time) => time !== mealTime)
        : [...prev.mealTimes, mealTime],
    }));
  };

  const toggleCuisine = (cuisine) => {
    setFormData((prev) => ({
      ...prev,
      preferredCuisines: prev.preferredCuisines.includes(cuisine)
        ? prev.preferredCuisines.filter((c) => c !== cuisine)
        : [...prev.preferredCuisines, cuisine],
    }));
  };

  const handleSubmit = async () => {
    if (subLoading) return;

    if (!hasCreateFeature) {
      toast.error("Upgrade to PRO to create meal plans");
      return;
    }

    if (mealPlanLimitReached) {
      toast.error("Monthly meal plan limit reached. Upgrade to PRO.");
      return;
    }

    try {
      setLoading(true);
      setLoadingStep(1);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to generate a meal plan.");
        setLoading(false);
        return;
      }

      // Step animation progression
      setTimeout(() => setLoadingStep(2), 1200);
      setTimeout(() => setLoadingStep(3), 2400);

      const plan = await generateMealPlan(formData, token);

      toast.success("Meal plan generated successfully!");
      navigate("/dashboard/mealPlans/view", { state: { mealPlan: plan } });

    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Monthly limit reached. Upgrade to PRO.");
      } else if (error.response?.status === 403) {
        toast.error("Upgrade to PRO to use this feature.");
      } else {
        toast.error("Failed to generate meal plan.");
      }
    } finally {
      setLoading(false);
      setLoadingStep(0);
    }
  };


  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
            Create Your Meal Plan
          </h1>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            Tell us about your goals and preferences, and our AI will craft a personalized nutrition plan just for you.
          </p>
        </div>

        <form className="space-y-6 sm:space-y-8">
          {/* Nutritional Goals */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6 border-b border-base-200 pb-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary"><Target size={24} /></div>
              <h2 className="text-2xl font-bold text-base-content">
                Nutritional Goals
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ["targetCalories", "Target Calories", "e.g., 2000"],
                ["targetProtein", "Protein (g)", "e.g., 150"],
                ["targetCarbs", "Carbs (g)", "e.g., 250"],
                ["targetFats", "Fats (g)", "e.g., 80"],
              ].map(([field, label, placeholder]) => (
                <div className="form-control" key={field}>
                  <label className="label">
                    <span className="label-text text-base-content/70">{label}</span>
                  </label>
                  <input
                    type="number"
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={placeholder}
                    className="input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              ))}
            </div>
          </div>
          </div>

          {/* Personal Profile */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6 border-b border-base-200 pb-4">
              <div className="p-3 bg-secondary/10 rounded-xl text-secondary"><User size={24} /></div>
              <h2 className="text-2xl font-bold text-base-content">
                Personal Profile
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Age */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/70">Age</span>
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="e.g., 30"
                  className="input input-bordered rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Sex */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/70">Sex</span>
                </label>
                <select
                  value={formData.sex}
                  onChange={(e) => handleInputChange("sex", e.target.value)}
                  className="select select-bordered rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Weight */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/70 flex items-center gap-2"><Scale size={14}/> Weight (kg)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="e.g., 70.5"
                  className="input input-bordered rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Height */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/70 flex items-center gap-2"><Ruler size={14}/> Height (cm)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  placeholder="e.g., 175"
                  className="input input-bordered rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Health Goal */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/70">Health Goal</span>
                </label>
                <select
                  value={formData.healthGoal}
                  onChange={(e) =>
                    handleInputChange("healthGoal", e.target.value)
                  }
                  className="select select-bordered rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select Goal</option>
                  {healthGoals.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              {/* Activity Level */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/70 flex items-center gap-2"><Activity size={14}/> Activity Level</span>
                </label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) =>
                    handleInputChange("activityLevel", e.target.value)
                  }
                  className="select select-bordered rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select Activity Level</option>
                  {activityLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          </div>

          {/* Dietary Preferences */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6 border-b border-base-200 pb-4">
              <div className="p-3 bg-accent/10 rounded-xl text-accent"><Utensils size={24} /></div>
              <h2 className="text-2xl font-bold text-base-content">
                Dietary Preferences
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {dietTypes.map((diet) => (
                <button
                  key={diet}
                  type="button"
                  onClick={() => handleInputChange("dietType", diet)}
                  className={`p-2 sm:p-3 rounded-xl border-2 transition text-sm ${
                    formData.dietType === diet
                      ? "border-primary bg-primary text-primary-content font-semibold shadow-md"
                      : "border-base-200 hover:border-base-300"
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>

            {/* Allergies + Restrictions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Allergies */}
              <div>
                <label className="label">
                  <span className="label-text text-base-content/70 flex items-center gap-2"><AlertCircle size={14}/> Allergies</span>
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    className="input input-bordered flex-1 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Add allergy"
                  />
                  <button
                    type="button"
                    className="btn btn-square btn-primary rounded-xl"
                    onClick={() =>
                      addToList("allergies", newAllergy, setNewAllergy)
                    }
                  >
                    <Plus />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.allergies.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-error/10 text-error rounded-full flex items-center gap-1 text-sm"
                    >
                      {item}
                      <X
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => removeFromList("allergies", idx)}
                      />
                    </span>
                  ))}
                </div>
              </div>

              {/* Restrictions */}
              <div>
                <label className="label">
                  <span className="label-text text-base-content/70 flex items-center gap-2"><AlertCircle size={14}/> Restrictions</span>
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRestriction}
                    onChange={(e) => setNewRestriction(e.target.value)}
                    className="input input-bordered flex-1 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Add restriction"
                  />
                  <button
                    type="button"
                    className="btn btn-square btn-primary rounded-xl"
                    onClick={() =>
                      addToList(
                        "restrictions",
                        newRestriction,
                        setNewRestriction
                      )
                    }
                  >
                    <Plus />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.restrictions.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-warning/10 text-warning rounded-full flex items-center gap-1 text-sm"
                    >
                      {item}
                      <X
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => removeFromList("restrictions", idx)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Meal Structure */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6 border-b border-base-200 pb-4">
              <div className="p-3 bg-warning/10 rounded-xl text-warning"><Clock size={24} /></div>
              <h2 className="text-2xl font-bold text-base-content">
                Meal Structure
              </h2>
            </div>

            {/* Meals Per Day */}
            <div className="form-control max-w-xs mb-6">
              <label className="label">
                <span className="label-text text-base-content/70">Meals Per Day</span>
              </label>
              <select
                value={formData.mealsPerDay}
                onChange={(e) =>
                  handleInputChange("mealsPerDay", e.target.value)
                }
                className="select select-bordered rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="3">3 meals</option>
                <option value="4">4 meals</option>
                <option value="5">5 meals</option>
                <option value="6">6 meals</option>
              </select>
            </div>

            {/* Preferred Meal Times */}
            <div>
              <label className="label">
                <span className="label-text text-base-content/70">
                  Preferred Meal Times
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {mealTimeOptions.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => toggleMealTime(time)}
                    className={`p-2 sm:p-3 rounded-xl border-2 text-sm transition ${
                      formData.mealTimes.includes(time)
                        ? "border-primary bg-primary text-primary-content font-semibold shadow-md"
                        : "border-base-200 hover:border-base-300"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
          </div>

          {/* Practical Constraints */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6 border-b border-base-200 pb-4">
              <div className="p-3 bg-success/10 rounded-xl text-success"><DollarSign size={24} /></div>
              <h2 className="text-2xl font-bold text-base-content">
                Practical Constraints
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Max Prep Time */}
              <div>
                <label className="label">
                  <span className="label-text text-base-content/70">
                    Max Prep Time (minutes)
                  </span>
                </label>
                <input
                  type="number"
                  value={formData.maxPrepTime}
                  onChange={(e) =>
                    handleInputChange("maxPrepTime", e.target.value)
                  }
                  placeholder="e.g., 45"
                  className="input input-bordered rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="label">
                  <span className="label-text text-base-content/70">
                    Budget ($ per week)
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  placeholder="e.g., 100"
                  className="input input-bordered rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div className="mt-6">
              <label className="label">
                <span className="label-text text-base-content/70 flex items-center gap-2"><ChefHat size={14}/> Available Ingredients</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  placeholder="Add ingredient"
                  className="input input-bordered flex-1 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  className="btn btn-square btn-primary rounded-xl"
                  onClick={() =>
                    addToList(
                      "availableIngredients",
                      newIngredient,
                      setNewIngredient
                    )
                  }
                >
                  <Plus />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {formData.availableIngredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-success/10 text-success px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {ingredient}
                    <X
                      className="w-4 h-4 cursor-pointer"
                      onClick={() =>
                        removeFromList("availableIngredients", index)
                      }
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
          </div>

          {/* Variety & Preferences */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6 border-b border-base-200 pb-4">
              <div className="p-3 bg-info/10 rounded-xl text-info"><Globe size={24} /></div>
              <h2 className="text-2xl font-bold text-base-content">
                Variety & Preferences
              </h2>
            </div>

            {/* Diverse Meals */}
            <div className="form-control mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.wantDiverseMeals}
                  onChange={(e) =>
                    handleInputChange("wantDiverseMeals", e.target.checked)
                  }
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm text-base-content/70">
                  I want diverse meals (variety in cuisines and ingredients)
                </span>
              </label>
            </div>

            {/* Cuisine Picker */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {cuisineTypes.map((cuisine) => (
                <button
                  key={cuisine}
                  type="button"
                  onClick={() => toggleCuisine(cuisine)}
                  className={`btn rounded-xl text-sm transition px-3 py-2 ${
                    formData.preferredCuisines.includes(cuisine)
                      ? "border-primary bg-primary text-primary-content font-semibold shadow-md"
                      : "border-base-200 text-base-content/70"
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-4 z-10">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                loading ||
                subLoading ||
                !hasCreateFeature ||
                mealPlanLimitReached
              }
              className="btn btn-primary w-full"
            >
              {
                loading
                  ? "Generating..."
                  : !hasCreateFeature
                    ? "Upgrade to PRO"
                    : mealPlanLimitReached
                      ? "Limit reached — Upgrade"
                      : "Create My Meal Plan"
              }
            </button>
            {!isPro && (
              <p className="text-xs text-gray-500 text-center mt-2">
                {usedMealPlans}/{MEAL_PLAN_LIMIT} meal plans used this month
              </p>
            )}
          </div>
        </form>

        {loading && (
  <div className="fixed inset-0 bg-base-300/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-base-100 shadow-2xl rounded-2xl p-8 w-[90%] max-w-md text-center animate-fade-in">

      <div className="mb-6">
        <div className="w-16 h-16 border-4 border-base-200 border-t-primary rounded-full animate-spin mx-auto" />
      </div>

      <h2 className="text-xl font-bold text-base-content mb-4">
        {loadingStep === 1 && "Gathering your details..."}
        {loadingStep === 2 && "Crafting personalized meals..."}
        {loadingStep === 3 && "Preparing your meal plan..."}
      </h2>

      <p className="text-base-content/60 text-sm animate-pulse">
        Sit tight, magic is happening ✨
      </p>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default MealPlanForm;
