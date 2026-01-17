import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import MealPlanForm from "./components/userComponents/MealPlanForm";
import AuthForm from "./components/AuthForm";
import MealPlanList from "./components/userComponents/MealPlanList";
import WeeklyMealView from "./components/userComponents/WeeklyMealView";
import SuggestedMeal from "./components/userComponents/SuggestedMeal";
import PersonalInfo from "./components/userComponents/PersonalInfo";
import PricingSection from "./components/sections/PricingSection";
import FavoriteMealSection from "./components/userComponents/FavoriteMealSection";
import UserPanel from "./pages/UserPanel";
import AdminPanel from "./pages/AdminPanel";
import RoleBasedRoute from "./routes/RoleBasedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Welcome from "./components/userComponents/Welcome";
import toast, { Toaster } from "react-hot-toast";
import Unauthorized from "./components/Unauthorized";
import MealBrowser from "./components/userComponents/MealBrowser";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route element={<PublicOnlyRoute />}>
          <Route path="/auth" element={<AuthForm />} />
        </Route>

        {/* Authenticated Redirection */}
        <Route path="/protected" element={<ProtectedRoute />} />

        {/* Admin-Only Routes */}
        <Route element={<RoleBasedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        {/* User Routes */}
        <Route
          element={
            <RoleBasedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]} />
          }
        >
          <Route path="/dashboard" element={<UserPanel />}>
            <Route index element={<Welcome />} />
            <Route path="create-meal-plan" element={<MealPlanForm />} />
            <Route path="mealPlans" element={<MealPlanList />} />
            <Route path="mealPlans/view" element={<WeeklyMealView />} />
            <Route path="mealPlans/:id" element={<WeeklyMealView />} />
            <Route path="random" element={<SuggestedMeal />} />
            <Route path="me" element={<PersonalInfo />} />
            <Route path="browse" element={<MealBrowser />} />
            <Route path="pricing" element={<PricingSection />} />
            <Route path="favorite-meal" element={<FavoriteMealSection />} />
          </Route>
        </Route>

        {/* Fallback Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
