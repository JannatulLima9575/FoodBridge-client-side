import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyPickups = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["pickups", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/api/pickups?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const pickups = Array.isArray(data) ? data : [];

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">My Pickups</h2>
      {pickups.length === 0 ? (
        <p>No pickups assigned yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {pickups.map((pickup) => (
            <div
              key={pickup._id}
              className="border rounded p-4 shadow bg-white"
            >
              <h3 className="text-lg font-bold">{pickup.title}</h3>
              <p>Restaurant: {pickup.restaurantName}</p>
              <p>Location: {pickup.restaurantLocation}</p>
              <p>Food Type: {pickup.type}</p>
              <p>Quantity: {pickup.quantity}</p>
              <p>
                Pickup Time:{" "}
                {pickup.pickupTime
                  ? new Date(pickup.pickupTime).toLocaleString()
                  : "N/A"}
              </p>
              <p>Status: {pickup.status}</p>
              {pickup.status !== "Picked Up" && (
                <button
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => handleConfirmPickup(pickup._id)}
                >
                  Confirm Pickup
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Example function for confirm pickup (implement API route accordingly)
const handleConfirmPickup = async (id) => {
  try {
    const res = await axios.patch(`/api/pickups/${id}/confirm`);
    console.log(res.data);
    // Optionally refetch pickups after confirming
  } catch (error) {
    console.error("Error confirming pickup", error);
  }
};

export default MyPickups;