import { BarChart } from "lucide-react";
import { useState } from "react";

const TopFeaturesChart = () => {
  const [features, setFeatures] = useState([]);

  // useEffect(() => {
  //   fetchTopFeatures().then(setFeatures);
  // }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Top Used Features</h3>
      <BarChart data={features} />
    </div>
  );
};

export default TopFeaturesChart;