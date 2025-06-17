const UserNavbar = () => (
  <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    <h1 className="text-2xl text-black font-bold">FitMeal Planner</h1>
    <div className="hidden md:flex space-x-4 text-black items-center">
      <a className="link link-hover">Home</a>
      <a className="link link-hover">Create a meal plan</a>
      <a className="link link-hover">About FitMeal</a>
      <button className="btn btn-sm btn-outline">User zone</button>
    </div>
  </div>
);
export default UserNavbar;
