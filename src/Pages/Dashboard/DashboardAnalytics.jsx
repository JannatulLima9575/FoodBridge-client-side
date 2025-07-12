import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const DashboardAnalytics = () => {
  const { user } = useContext(AuthContext);

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["summary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/donations/summary?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-6">Loading analytics...</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-10">
      <div className="p-4 rounded-lg bg-success text-white text-center">
        <h3 className="text-2xl font-bold">{stats.total}</h3>
        <p>Total Posted</p>
      </div>
      <div className="p-4 rounded-lg bg-warning text-white text-center">
        <h3 className="text-2xl font-bold">{stats.available}</h3>
        <p>Available</p>
      </div>
      <div className="p-4 rounded-lg bg-error text-white text-center">
        <h3 className="text-2xl font-bold">{stats.picked}</h3>
        <p>Picked Up</p>
      </div>
    </div>
  );
};

export default DashboardAnalytics;