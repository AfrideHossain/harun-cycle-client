import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";

const Statistics = ({ bills }) => {
  // Aggregate data by day
  const aggregatedData = useMemo(() => {
    const map = new Map();

    bills.forEach((item) => {
      const date = new Date(item.date).toDateString(); // Group by day
      if (!map.has(date)) {
        map.set(date, { date, totalAmount: 0 });
      }
      const entry = map.get(date);
      entry.totalAmount += item.billAmount;
    });

    return Array.from(map.values()).map((entry) => ({
      date: entry.date,
      total: entry.totalAmount,
    }));
  }, [bills]);

  return (
    <div className="bg-gray-50 px-6 py-8 w-auto h-auto shadow-md rounded-lg p-8">
      <div className="text-xl font-bold text-gray-700 mb-4">
        Sell's Statistics
      </div>
      <div className="w-full h-80 flex items-center bg-gray-50">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={aggregatedData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              formatter={(value) =>
                `${value
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} Taka`
              }
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
            <Brush dataKey="date" height={30} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
