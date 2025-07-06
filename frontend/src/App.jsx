import "./App.css";
import LandingPage from "./pages/LandingPage";
import MealCard from "./components/layout/MealCard";
import { Route, Routes } from "react-router-dom";
import MealPlanForm from "./components/userComponents/MealPlanForm";
import AuthForm from "./components/AuthForm";
import MealPlanList from "./components/userComponents/MealPlanList";
import WeeklyMealView from "./components/userComponents/WeeklyMealView";
import SuggestedMeal from "./components/userComponents/SuggestedMeal";
import PersonalInfo from "./components/userComponents/PersonalInfo";
import CustomMealPlanBuilder from "./components/userComponents/CustomMealPlanBuilder";
import PricingSection from "./components/sections/PricingSection";
import Welcome from "./components/sections/Welcome";
import FavoriteMealSection from "./components/sections/FavoriteMealSection";
import UserPanel from "./pages/UserPanel";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <>
      <Routes>
        {/* for non-users */}
        <Route path="auth" element={<AuthForm />} />
        <Route path="/" element={<LandingPage />} />

        {/* for Users */}
        <Route path="/dashboard" element={<UserPanel />}>
          <Route index element={<Welcome />} />
          <Route path="meals/:mealId" element={<MealCard />} />
          <Route path="create-meal-plan" element={<MealPlanForm />} />
          <Route path="mealPlans" element={<MealPlanList />} />
          <Route path="meals" element={<WeeklyMealView />} />
          <Route path="random" element={<SuggestedMeal />} />
          <Route path="me" element={<PersonalInfo />} />
          <Route path="build" element={<CustomMealPlanBuilder />} />
          <Route path="pricing" element={<PricingSection />} />
          <Route path="favorite-meal" element={<FavoriteMealSection />} />
        </Route>

        {/* for Admin */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
