const FindRecipeSection = () => (
  <div className="card bg-white shadow p-4">
    <p className="font-medium mb-2">Find recipes</p>
    <div className="flex flex-wrap gap-2 text-sm">
      {["Meal types", "Snack options", "Desserts", "Smoothies", "Fitness goals", "Dietary tips"].map(tag => (
        <span key={tag} className="badge badge-outline">{tag}</span>
      ))}
    </div>
  </div>
);
export default FindRecipeSection;
