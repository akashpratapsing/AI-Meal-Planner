const MealSuggestionSection = () => (
  <div className="grid sm:grid-cols-2 gap-4">
    <div className="card bg-white shadow">
      <div className="card-body p-4">
        <h3 className="font-medium mb-2">Upcoming meal suggestions</h3>
        <ul className="text-sm space-y-1">
          <li className="flex justify-between">Healthy breakfast <span>Sept 16</span></li>
          <li className="flex justify-between">Nutritious lunch <span>Sept 16</span></li>
        </ul>
      </div>
    </div>

    <div className="card bg-white shadow">
      <div className="card-body p-4">
        <h3 className="font-medium mb-2">Recent meal suggestions</h3>
        <ul className="text-sm space-y-1">
          <li className="flex justify-between">Healthy Recipes <span>Sept 20</span></li>
        </ul>
        <button className="btn btn-primary btn-sm mt-4 w-full">Create Meal Plan</button>
      </div>
    </div>
  </div>
);
export default MealSuggestionSection;
