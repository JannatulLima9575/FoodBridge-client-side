import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import DonationDetailsMap from "./DonationDetailsMap";
import toast from "react-hot-toast";
import AuthContext from "../../Provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReportDonationModal from "../Dashboard/ReportDonationModal";
import ReviewSection from "../SubPage/ReviewSection";
import ReviewModal from "../SubPage/ReviewModal";

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [review, setReview] = useState(false);

  const {
    data: donation = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donationDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <p className="text-center my-10 text-gray-700 dark:text-gray-300">Loading...</p>;
  }

  const {
    title,
    image,
    description,
    pickupTime,
    foodType,
    quantity,
    status,
    restaurantInfo,
    location,
    restaurantEmail,
    restaurantName,
    lat,
    lng,
  } = donation;

  const handleSaveFavorite = async () => {
    try {
      const res = await axiosSecure.post("/favorites", {
        donationId: id,
        userEmail: user?.email,
      });
      if (res.data.insertedId) toast.success("Added to favorites!");
      else toast.error("Already in favorites.");
    } catch (error) {
      toast.error("Failed to save to favorites.", error);
    }
  };

  const handleRequestDonation = async () => {
    try {
      const res = await axiosSecure.post("/charityRequests", {
        donationId: id,
        charityEmail: user?.email,
        pickupTime: pickupTime || "10:00 AM - 12:00 PM",
        charityName: user?.displayName,
        charityImage: user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png",
        status: "Pending",
      });
      if (res.data.insertedId) {
        toast.success("Donation requested!");
        refetch();
      }
    } catch (error) {
      if (error.status === 400) toast.error("You already requested this donation.");
      else toast.error("Failed to request donation.", error);
    }
  };

  const handleConfirmPickup = async () => {
    try {
      const res = await axiosSecure.put(`/charityPickups`, {
        donationId: id,
        charityEmail: user?.email,
        pickupTime: pickupTime || "10:00 AM - 12:00 PM",
      });
      if (res) {
        toast.success("Pickup confirmed!");
        refetch();
      }
    } catch (error) {
      if (error.status === 404) toast.error(error.response.data.message);
      else toast.error("Failed to confirm pickup.", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={image} alt={title} className="rounded-xl shadow-lg w-full" />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-2 text-[#257429] dark:text-[#F9A825]">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
          <p className="mb-2 text-gray-700 dark:text-gray-300"><strong>Food Type:</strong> {foodType}</p>
          <p className="mb-2 text-gray-700 dark:text-gray-300"><strong>Quantity:</strong> {quantity}</p>
          <p className="mb-2 text-gray-700 dark:text-gray-300"><strong>Pickup Time:</strong> {pickupTime}</p>
          <p className="mb-2 text-gray-700 dark:text-gray-300"><strong>Status:</strong> {status}</p>
          <p className="mb-4 text-gray-700 dark:text-gray-300"><strong>Location:</strong> {location}</p>

          <div className="mb-4 text-gray-700 dark:text-gray-300">
            <h4 className="font-semibold mb-1">Restaurant Info:</h4>
            <p><strong>Name:</strong> {restaurantName}</p>
            <p><strong>Email:</strong> {restaurantEmail}</p>
          </div>

          {/* Buttons */}
          {user?.role === "user" && (
            <button onClick={handleSaveFavorite} className="btn btn-outline btn-sm mr-3 mb-2">
              💖 Save to Favorites
            </button>
          )}

          {user?.role === "charity" && (
            <>
              <button onClick={handleRequestDonation} className="btn btn-primary btn-sm mr-3 mb-2">
                📦 Request Donation
              </button>

              {status === "approved" && (
                <button onClick={handleConfirmPickup} className="btn btn-success btn-sm mr-3 mb-2">
                  ✅ Confirm Pickup
                </button>
              )}
            </>
          )}

          {["user", "charity"].includes(user?.role) && (
            <button
              className="btn btn-error btn-sm mb-2"
              onClick={() => document.getElementById("report_modal").showModal()}
            >
              🚨 Report Donation
            </button>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-3 text-[#257429] dark:text-[#F9A825]">Location Map</h3>
        {/* <DonationDetailsMap lat={lat} lng={lng} /> */}
      </div>

      {/* Review Section */}
      <div className="mt-10">
        <ReviewSection donationId={id} />
        {["user", "charity"].includes(user?.role) && (
          <div className="mt-4">
            <button
              className="btn btn-outline"
              onClick={() => setReview(!review)}
            >
              ✍️ Add a Review
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <ReportDonationModal donationId={id} />
      {review && (
        <ReviewModal
          donationId={id}
          user={user}
          isOpen={review}
          onClose={() => setReview(false)}
        />
      )}
    </div>
  );
};

export default DonationDetails;
