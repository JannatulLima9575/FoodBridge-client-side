import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import  AuthContext  from "../../../Provider/AuthContext";
import { NavLink } from "react-router";

const ReceivedDonations = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const[donations,setdonations]=useState([])

  const { data, isLoading } = useQuery({
    queryKey: ["receivedDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/received-donations?email=${user.email}`);
      return res.data;
    },
  });

  useEffect(()=>{
    const donations = Array.isArray(data) ? data : [];
    setdonations(donations)
  },[data])

  console.log(donations);
  

  if (isLoading) return <p>Loading...</p>;



  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Received Donations</h2>
      {donations.length === 0 ? (
        <p>No received donations yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="border rounded p-4 shadow bg-white"
            >
              <h3 className="text-lg font-bold">{donation.title}</h3>
              <p>Restaurant: {donation.restaurantName}</p>
              <p>Food Type: {donation.foodType}</p>
              <p>Quantity: {donation.quantity}</p>
              <p>
                Pickup Date:{" "}
                {donation.pickupTime
                  ? donation.pickupTime
                  : "N/A"}
              </p>
              <NavLink to={`/donations/${donation.donationId}`} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
                Review
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceivedDonations;