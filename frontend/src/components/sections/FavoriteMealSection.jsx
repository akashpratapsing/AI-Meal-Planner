const FavoriteMealSection = () => {
  const meals = [
    "Quinoa Salad", "Grilled Chicken", "Avocado Toast",
    "Protein Shake", "Vegan Bowl", "Greek Yogurt"
  ];

  return (
    <div className="card bg-white shadow p-4">
      <h3 className="font-medium mb-4">Your favorite meals</h3>
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        {meals.map((meal) => (
          <div key={meal} className="flex flex-col items-center">
            <div className="text-3xl">🍎</div>
            <p>{meal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FavoriteMealSection;
