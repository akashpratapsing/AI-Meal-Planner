import { useState } from "react";

const UserCountCard = () => {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   // fetchUserCount().then(setCount);
  // }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
      <h3 className="text-xl font-semibold">Total Users</h3>
      <p className="text-4xl font-bold text-blue-600">{count}</p>
    </div>
  );
};

export default UserCountCard;