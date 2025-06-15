import UserFooter from "../components/layout/UserFooter";
import UserNavbar from "../components/layout/UserNavbar";
import CalendarCard from "../components/sections/CalendarCard";
import FavoriteMealSection from "../components/sections/FavoriteMealSection";
import FindRecipeSection from "../components/sections/FindRecipeSection";
import MealPlans from "../components/sections/MealPlans";
import MealSuggestionSection from "../components/sections/MealSuggestionSection";
import ProfileSidebar from "../components/sections/ProfileSidebar";
import SuccessStorySection from "../components/sections/SuccessStorySection";

const ProfilePage = () => (
  <>
    <UserNavbar />
    <div className="min-h-screen bg-[#d2f0f8] p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProfileSidebar />
        <div className="md:col-span-2 space-y-6">
          <MealSuggestionSection />
          <CalendarCard />
          <FavoriteMealSection />
          <SuccessStorySection />
        </div>
        <div className="md:col-span-1 space-y-6">
          <FindRecipeSection />
          <MealPlans />
        </div>
      </div>
    </div>
    <UserFooter />
  </>
);

export default ProfilePage;
