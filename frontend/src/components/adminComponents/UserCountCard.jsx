import React, { useEffect, useState } from "react";
import { getTotalUserCount } from "../../services/adminService";
import { Users } from "lucide-react";

const UserCountCard = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTotalUserCount()
      .then((res) => {
        setCount(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching total user count", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card bg-white shadow-md hover:shadow-lg transition p-4 rounded-2xl">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div>
          <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {loading ? (
              <div className="skeleton h-6 w-20"></div>
            ) : (
              count.toLocaleString()
            )}
          </p>
        </div>

        {/* Right Icon */}
        <div className="bg-blue-100 text-blue-600 rounded-full p-3">
          <Users className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default UserCountCard;
