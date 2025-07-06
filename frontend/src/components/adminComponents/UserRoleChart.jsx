import { PieChart } from "lucide-react";
import { useState } from "react";

const UserRoleChart = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchUserRoles().then(setData);
  // }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Users by Role</h3>
      <PieChart data={data} />
    </div>
  );
};

export default UserRoleChart;