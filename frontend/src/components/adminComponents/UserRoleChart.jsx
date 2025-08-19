import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getActiveUserCountByPlan } from "../../services/adminService";
import { TrendingUp } from "lucide-react";

const UserRoleChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveUserCountByPlan()
      .then((res) => {
        const formatted = Object.entries(res.data).map(([plan, count]) => ({
          plan,
          count,
        }));
        setData(formatted);
        setLoading(false); // stop loading
      })
      .catch((err) => {
        console.error("Error fetching user count by plan", err);
        setLoading(false);
      });
  }, []);
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="card bg-base-100 shadow-lg compact">
          <div className="card-body">
            <p className="font-semibold">{`${label} Plan`}</p>
            <p className="text-primary">
              {`Users: ${payload[0].value.toLocaleString()}`}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          <h2 className="card-title text-xl">Users by Subscription Plan</h2>
        </div>
        <p className="text-sm opacity-70 mb-4">
          Distribution across different plans
        </p>

        {loading ? (
          <div className="skeleton h-80 w-full"></div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--p))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--s))"
                    stopOpacity={0.8}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--bc) / 0.1)"
              />
              <XAxis
                dataKey="plan"
                stroke="hsl(var(--bc) / 0.6)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--bc) / 0.6)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default UserRoleChart;
