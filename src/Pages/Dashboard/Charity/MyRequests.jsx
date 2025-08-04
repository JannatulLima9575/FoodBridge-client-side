import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";


const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const [requests,setrequests] = useState([]);

  const { data, isLoading,refetch } = useQuery({
    queryKey: ["requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
      const res = await axios.get(`/myCharityRequests?email=${user.email}`);
      return res.data;
      } catch (error) {
        console.error("Error fetching requests:", error); 
        return [];
      }
    },
  });


  useEffect(() => {
  console.log("My Requests Data:", data);
  const requests = Array.isArray(data) ? data : [];
  setrequests(requests);
},[data]);

  // cancel handler
const handleCancelRequest = async (id) => {
  try {
    console.log("Canceling request with ID:", id );
    
    const res = await axios.delete(`/myCharityRequests/${id}`);
    console.log("Request canceled", res.data);
    refetch();
    // Optionally refetch requests after deletion
  } catch (error) {
    console.error("Error cancelling request", error);
  }
};

  if (isLoading) return <p>Loading...</p>;


  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">My Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="border rounded p-4 shadow bg-white"
            >
              <h3 className="text-lg font-bold">{request.donationTitle}</h3>
              <p>Restaurant: {request.restaurantName}</p>
              <p>Food Type: {request.foodType}</p>
              <p>Quantity: {request.quantity}</p>
              <p>Status: {request.status}</p>
              {request.status === "Pending" && (
                <button
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleCancelRequest(request._id)}
                >
                  Cancel Request
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      
    </div>
    
  );

};


export default MyRequests;