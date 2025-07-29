// src/Pages/Dashboard/Summary.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Summary = () => {
  const [stats, setStats] = useState({});
  const email = localStorage.getItem("userEmail");
  const axios = useAxiosSecure();

  useEffect(() => {
    axios
      .get(`/donations/summary?email=${email}`)
      .then((res) => setStats(res.data));
  }, [email]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Donation Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-green-100 rounded-lg shadow">
          <p className="text-lg font-semibold">Total Donations</p>
          <p className="text-3xl">{stats.total || 0}</p>
        </div>
        <div className="p-6 bg-yellow-100 rounded-lg shadow">
          <p className="text-lg font-semibold">Available</p>
          <p className="text-3xl">{stats.available || 0}</p>
        </div>
        <div className="p-6 bg-blue-100 rounded-lg shadow">
          <p className="text-lg font-semibold">Picked Up</p>
          <p className="text-3xl">{stats.picked || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;