import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import  AuthContext  from "../../../Provider/AuthContext";

const ReceivedDonations = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["receivedDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/received-donations?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const donations = Array.isArray(data) ? data : [];

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
              <p>Food Type: {donation.type}</p>
              <p>Quantity: {donation.quantity}</p>
              <p>
                Pickup Date:{" "}
                {donation.pickupDate
                  ? new Date(donation.pickupDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
                Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceivedDonations;