const ProfileSidebar = () => (
  <div className="bg-white backdrop-blur-md bg-opacity-60 rounded-xl shadow p-4">
    <div className="flex flex-col items-center text-center">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        className="w-24 h-24 rounded-full mb-2"
        alt="profile"
      />
      <h2 className="text-lg text-black font-bold">Jhon Doe</h2>
      <p className="text-sm text-gray-800">Transform your diet</p>
    </div>

    <div className="mt-6 space-y-4 text-black text-sm">
      <div>
        <p className="font-medium">User testimonials</p>
        <p className="text-gray-500">Favorite meals: Vegan, Keto, Paleo</p>
        <p className="text-gray-500">Dietary: Personalized</p>
      </div>

      <div>
        <p className="font-medium">Meal categories</p>
        <div className="flex flex-wrap gap-2 mt-1">
          <div className="badge badge-info">Breakfast</div>
          <div className="badge badge-info">Lunch</div>
          <div className="badge badge-info">Dinner</div>
        </div>
      </div>

      <div>
        <p className="font-medium">Last meal plan</p>
        <p className="text-xs text-gray-500">09/15/2023 🍽</p>
        <p className="text-xs text-gray-600">Revamp your eating habits!</p>
      </div>
    </div>
  </div>
);
export default ProfileSidebar;
