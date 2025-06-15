const MealPlans = () => {
  const users = [
    { name: "Alex Green", role: "Meal Planning" },
    { name: "Jamie Fit", role: "Nutritionist" },
    { name: "Chris Blue", role: "Fitness Coach" },
    { name: "Taylor Swift", role: "Dietitian" },
    { name: "Jordan Black", role: "Wellness Advisor" },
  ];

  return (
    <div className="card bg-white shadow p-4">
      <p className="font-medium mb-2">Your meal plans</p>
      <ul className="text-sm space-y-2">
        {users.map((user) => (
          <li key={user.name} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-8 rounded-full bg-blue-200"></div>
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
            <button className="btn btn-xs">•••</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MealPlans;
