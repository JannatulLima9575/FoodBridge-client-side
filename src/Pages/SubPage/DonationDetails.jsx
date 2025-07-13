import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DonationDetailsMap from "./DonationDetailsMap";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [requested, setRequested] = useState(false); // ✅ new state

  // Fetch single donation
  const { data: donation, isLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/donations/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (!donation) return <p className="text-center text-red-500 py-10">Donation not found</p>;

  // Handle request button
  const handleRequest = async () => {
    const requestData = {
      donationId: donation._id,
      charityName: user?.displayName || "Charity User",
      charityImage: user?.photoURL || "",
      requestDescription: `We would like to collect the donation titled "${donation.title}".`,
    };

    try {
      await axios.post("http://localhost:5000/api/charity-requests", requestData);
      toast.success("✅ Request submitted successfully!");
      setRequested(true); // ✅ disable after success
    } catch (error) {
      toast.error("❌ Failed to submit request.");
      console.error(error);
    }
  };

  return (
    <section className="py-14 px-4 md:px-8 bg-white dark:bg-neutral-900 min-h-screen">
      <div className="max-w-4xl mx-auto bg-base-100 dark:bg-neutral rounded-xl p-6 shadow-md">
        <img
          src={donation.image}
          alt={donation.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
          🍱 {donation.foodType}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Title:</strong> {donation.title}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Restaurant:</strong> {donation.restaurantName}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Location:</strong> {donation.location}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Quantity:</strong> {donation.quantity} kg
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          <strong>Status:</strong>{" "}
          <span
            className={`font-bold ${
              donation.status === "Available"
                ? "text-green-600"
                : donation.status === "Picked Up"
                ? "text-red-500"
                : "text-yellow-600"
            }`}
          >
            {donation.status}
          </span>
        </p>

        {/* ✅ Request Button for charity */}
        {user?.role === "charity" && (
          <button
            onClick={handleRequest}
            disabled={requested}
            className={`btn mt-6 ${requested ? "btn-disabled bg-gray-400 text-white" : "btn-primary"}`}
          >
            {requested ? "✅ Request Sent" : "Request This Donation"}
          </button>
        )}

        {/* 🗺️ Map */}
        {donation.latitude && donation.longitude && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 text-primary">📍 Map Location</h3>
            <DonationDetailsMap
              latitude={donation.latitude}
              longitude={donation.longitude}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DonationDetails;