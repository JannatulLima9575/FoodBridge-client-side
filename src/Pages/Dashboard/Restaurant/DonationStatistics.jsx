import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SectionTitle from "./SectionTitle";
import useAuth from "../../../Provider/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28FD0",
  "#F96D80",
];

const DonationStatistics = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

useEffect(() => {
  if (user?.uid && !loading) {
    axiosSecure
      .get(`/donations/stats?userId=${user.uid}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setData(res.data); // set the chart data
        } else {
          setData([]);
        }
      })
      .catch((err) => console.error("❌ Stats API error", err));
  }
}, [user, axiosSecure, loading]);


  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <SectionTitle
        title="Donation Statistics"
        subtitle="See how many items you've donated by type"
      />

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={140}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          No donation data found.
        </div>
      )}
    </div>
  );
};

export default DonationStatistics;
