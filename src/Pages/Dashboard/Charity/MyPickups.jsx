import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext  from "../../../Provider/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const MyPickups = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const navigate=useNavigate()
  const [pickups,setpickups]=useState([])

const { data, isLoading} = useQuery({
  queryKey: ["pickups", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axios.get(`/charityPickups?email=${user.email}`);
    return res.data;
  },
});
//function for confirm pickup (implement API route accordingly)
const handleConfirmPickup = async (id) => {
  try {
    const res = await axios.patch(`/charityPickups/${id}/pickup`);
    console.log(res.data);
    toast.success('Confirm Picked up')
    navigate('/dashboard/received-donations')
    // Optionally refetch pickups after confirming
  } catch (error) {
    toast.error('Fail to conform picked up')
    console.error("Error confirming pickup", error);
  }
};
console.log(pickups);

useEffect(()=>{
   const res = Array.isArray(data) ? data : [];
   setpickups(res)
},[data])

  if (isLoading) return <p>Loading...</p>;



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
              <p>Location: {pickup.location}</p>
              <p>Food Type: {pickup.pickupTime}</p>
              <p>Quantity: {pickup.quantity}</p>
              <p>
                Pickup Time:{" "}
                {pickup.pickupTime
                  ? pickup.pickupTime
                  : "N/A"}
              </p>
              <p>Status: {pickup.status}</p>
              {pickup.status !== "pickedup" && (
                <button
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => handleConfirmPickup(pickup._id)}
                >
                  Confirm Pickup
                </button>
              )}
              {pickup.status === "pickedup" && (
                <p
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                >
                  Already picked up
                </p>
              )}
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default MyPickups;