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
  const[review, setreview] = useState(false);

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
  });

  if (isLoading) {
    return <p className="text-center my-10">Loading...</p>;
  }

  console.log("Donation Details:", donation);
  

  const {
    title,
    image,
    description,
    pickupLocation,
    pickupTime,
    foodType,
    quantity,
    status,
    restaurantInfo,
    lat,
    lng,
  } = donation;

  console.log('user:', user);
  

  const handleSaveFavorite = async () => {
    try {
      const res = await axiosSecure.post("/favorites", {
        donationId: id,
        userEmail: user?.email,
      });
      if (res.data.insertedId) {
        toast.success("Added to favorites!");
      } else {
        toast.error("Already in favorites.");
      }
    } catch (error) {
      toast.error("Failed to save to favorites.", error);
    }
  };

  const handleRequestDonation = async () => {
    try {
      const res = await axiosSecure.post("/requests", {
        donationId: id,
        charityEmail: user?.email,
        pickupTime: pickupTime || "10:00 AM - 12:00 PM", // You can update this later
        status: "Pending",
      });
      if (res.data.insertedId) {
        toast.success("Donation requested!");
        refetch();
      } else {
        toast.error("You already requested this donation.");
      }
    } catch (error) {
      toast.error("Failed to request donation.", error);
    }
  };

  const handleConfirmPickup = async () => {
    try {
      const res = await axiosSecure.patch(`/requests/confirm/${id}`, {
        charityEmail: user?.email,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Pickup confirmed!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to confirm pickup.", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={image} alt={title} className="rounded-xl shadow" />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <p className="mb-2">
            <strong>Food Type:</strong> {foodType}
          </p>
          <p className="mb-2">
            <strong>Quantity:</strong> {quantity}
          </p>
          <p className="mb-2">
            <strong>Pickup Time:</strong> {pickupTime}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {status}
          </p>
          <p className="mb-4">
            <strong>Location:</strong> {pickupLocation}
          </p>

          <div className="mb-4">
            <h4 className="font-semibold mb-1">Restaurant Info:</h4>
            <p>
              <strong>Name:</strong> {restaurantInfo?.name}
            </p>
            <p>
              <strong>Email:</strong> {restaurantInfo?.email}
            </p>
          </div>

          {user?.role === "user" && (
            <button
              onClick={handleSaveFavorite}
              className="btn btn-outline btn-sm mr-3"
            >
              💖 Save to Favorites
            </button>
          )}

          {/* Request Donation (charity only) */}
          {user?.role === "charity" && (
            <button
              onClick={handleRequestDonation}
              className="btn btn-primary btn-sm mr-3"
            >
              📦 Request Donation
            </button>
          )}

          {/* Confirm Pickup (charity only if status === accepted) */}
          {user?.role === "charity" && status === "approved" && (
            <button
              onClick={handleConfirmPickup}
              className="btn btn-success btn-sm mr-3"
            >
              ✅ Confirm Pickup
            </button>
          )}

          {/* Report Button */}
          {["user", "charity" ].includes(user?.role) && (
            <button
              className="btn btn-error btn-sm"
              onClick={() =>
                document.getElementById("report_modal").showModal()
              }
            >
              🚨 Report Donation
            </button>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-3">Location Map</h3>
       {/*  <DonationDetailsMap lat={lat} lng={lng} /> */}
      </div>

      {/* Review Section */}
      <div className="mt-10">
        <ReviewSection  donationId={id} />
        {["user", "charity"].includes(user?.role) && (
          <div className="mt-4">
            <button
              className="btn btn-outline"
              onClick={() =>
                setreview(review => !review)
              }
            >
              ✍️ Add a Review
            </button>
          </div>
        )}
      </div>

      {/* Modals */} 
      <ReportDonationModal donationId={id} />
      <ReviewModal donationId={id} user={user} isOpen={review} onClose={()=>{setreview(false)}} /> 
    </div>
  );
};

export default DonationDetails;
