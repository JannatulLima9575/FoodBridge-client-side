import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaClipboardList, FaCheckCircle, FaBoxOpen } from "react-icons/fa";

const DashboardAnalytics = () => {
  const { user } = useContext(AuthContext);

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["summary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/donations/?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center py-6 text-lg">Loading analytics...</p>;

  const cards = [
    {
      label: "Total Posted",
      count: stats.total,
      icon: <FaClipboardList className="text-3xl" />,
      bg: "bg-success",
    },
    {
      label: "Available",
      count: stats.available,
      icon: <FaBoxOpen className="text-3xl" />,
      bg: "bg-warning",
    },
    {
      label: "Picked Up",
      count: stats.picked,
      icon: <FaCheckCircle className="text-3xl" />,
      bg: "bg-error",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg ${card.bg} text-white shadow-lg text-center`}
        >
          <div className="mb-2 flex justify-center">{card.icon}</div>
          <h3 className="text-4xl font-bold">{card.count}</h3>
          <p className="mt-1 text-lg font-semibold">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardAnalytics;