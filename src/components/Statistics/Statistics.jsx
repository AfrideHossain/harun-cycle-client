import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Statistics = ({ bills }) => {
  const data = [
    { name: "Mon", income: 2000 },
    { name: "Tue", income: 3000 },
    { name: "Wed", income: 5000 },
    { name: "Thu", income: 4000 },
    { name: "Fri", income: 6000 },
    { name: "Sat", income: 7000 },
    { name: "Sun", income: 8000 },
  ];
  return (
    <div className="bg-gray-50 px-6 py-8 w-auto h-auto shadow-md rounded-lg p-8">
      <div className="text-xl font-bold text-gray-700 mb-4">
        Today's Statistics
      </div>
      <div className="w-full h-80 flex items-center bg-gray-50">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={bills}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="clientName" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="billAmount"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
