import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import AuthContext from "../Provider/AuthContext";
import ReviewSection from "./ReviewSection";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReportDonationModal from "../Dashboard/ReportDonationModal";
import MapView from "./MapView";
import AuthContext from "../../Provider/AuthContext";

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [requested, setRequested] = useState(false);
  const [requestAccepted, setRequestAccepted] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    data: donation,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    const fetchRequest = async () => {
      if (user?.role === "charity") {
        const res = await axiosSecure.get("/charityRequests");
        const matched = res.data.find(
          (r) =>
            r.donationId === id &&
            r.charityEmail === user?.email &&
            r.status === "Accepted"
        );
        if (matched) {
          setRequestAccepted(true);
        }
      }
    };
    fetchRequest();
  }, [id, user, axiosSecure]);

  if (isLoading)
    return <p className="text-center py-10">Loading donation details...</p>;
  if (!donation)
    return (
      <p className="text-center text-red-500 py-10">
        Donation not found or deleted.
      </p>
    );

  const handleSaveFavorite = async () => {
    const favorite = {
      userEmail: user?.email,
      donationId: donation._id,
      donationTitle: donation.title,
      restaurantName: donation.restaurantName,
      image: donation.image,
    };

    try {
      await axiosSecure.post("/favorites", favorite);
      toast.success("💖 Saved to Favorites!");
    } catch (error) {
      if (error.response?.status === 409) {
        toast("Already in favorites!");
      } else {
        toast.error("Failed to save favorite.");
      }
    }
  };

  const handleRequest = async () => {
    const requestData = {
      donationId: donation._id,
      donationTitle: donation.title,
      restaurantName: donation.restaurantName,
      restaurantEmail: donation.restaurantEmail,
      charityName: user?.displayName,
      charityEmail: user?.email,
      charityImage: user?.photoURL || "https://i.ibb.co/6RWxfX2v/image.png",
      requestDescription: `We would like to collect the donation titled \"${donation.title}\".`,
      pickupTime: "10:00 AM - 12:00 PM",
    };

    try {
      await axiosSecure.post("/charityRequests", requestData);
      toast.success("✅ Request submitted successfully!");
      setRequested(true);
    } catch (error) {
      toast.error("❌ Failed to submit request.");
    }
  };

  const handleConfirmPickup = async () => {
    try {
      await axiosSecure.patch(`/donations/confirm/${donation._id}`);
      toast.success("📦 Marked as Picked Up");
      refetch();
    } catch (error) {
      toast.error("❌ Failed to confirm pickup.");
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

        <div className="flex flex-wrap gap-2">
          {(user?.role === "user" || user?.role === "charity") && (
            <button onClick={handleSaveFavorite} className="btn btn-outline">
              💖 Save to Favorites
            </button>
          )}

          {user?.role === "charity" && (
            <button
              onClick={handleRequest}
              disabled={requested}
              className={`btn ${
                requested ? "btn-disabled bg-gray-400 text-white" : "btn-primary"
              }`}
            >
              {requested ? "✅ Request Sent" : "Request This Donation"}
            </button>
          )}

          {(user?.role === "user" || user?.role === "charity") && (
            <button
              onClick={() => setIsReportOpen(true)}
              className="btn btn-outline btn-error"
            >
              🚨 Report Donation
            </button>
          )}
        </div>

        {user?.role === "charity" &&
          requestAccepted &&
          donation.status !== "Picked Up" && (
            <button
              onClick={handleConfirmPickup}
              className="btn mt-4 bg-green-600 text-white"
            >
              📦 Confirm Pickup
            </button>
          )}

        <ReviewSection donationId={donation._id} />

        {/* ✅ MapBox Integration */}
        {donation.latitude && donation.longitude && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 text-primary">
              📍 Map Location
            </h3>
            <MapView lat={donation.latitude} lng={donation.longitude} />
          </div>
        )}
      </div>

      {/* ✅ Report Modal */}
      <ReportDonationModal
        isOpen={isReportOpen}
        closeModal={() => setIsReportOpen(false)}
        donationId={donation._id}
      />
    </section>
  );
};

export default DonationDetails;