import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Navigate } from "react-router";
import useAuth from "../../Provider/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00C49F", "#FFBB28"];

const DonationStatistics = () => {
  const { user, loading } = useAuth();
//   const [axiosSecure] = useAxiosSecure();
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get("/donations/stats");
        setData(res.data);
      } catch (err) {
        console.error("Stats fetch failed", err);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  // 🔒 Optional: route protection
  if (user?.role !== "restaurant") {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Donation Type Statistics</h2>
      {data.length ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No statistics available</p>
      )}
    </div>
  );
};

export default DonationStatistics;