import { LineChart } from "lucide-react";
import { useState } from "react";

const ActiveUsersChart = () => {
  const [activeData, setActiveData] = useState([]);

  // useEffect(() => {
  //   fetchActiveUserStats().then(setActiveData);
  // }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Active Users (DAU / WAU)</h3>
      <LineChart data={activeData} />
    </div>
  );
};

export default ActiveUsersChart;