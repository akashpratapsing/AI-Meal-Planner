import UserFooter from "../components/layout/UserFooter";
import UserNavbar from "../components/layout/UserNavbar";
import CalendarCard from "../components/sections/CalendarCard";
import FavoriteMealSection from "../components/sections/FavoriteMealSection";
import MealSuggestionSection from "../components/sections/MealSuggestionSection";
import ProfileSidebar from "../components/sections/ProfileSidebar";
import RightSidebar from "../components/sections/RightSidebar";
import SuccessStorySection from "../components/sections/SuccessStorySection";

const ProfilePage = () => (
  <>
    <UserNavbar />
    <div className="min-h-screen bg-[#d2f0f8] p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProfileSidebar />

        <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-6">
          <MealSuggestionSection />
          <CalendarCard />
          <FavoriteMealSection />
          <SuccessStorySection />
        </div>

        <div className="md:block md:col-span-1 space-y-6">
          <RightSidebar />
        </div>
      </div>
    </div>
    <UserFooter />
  </>
);

export default ProfilePage;
