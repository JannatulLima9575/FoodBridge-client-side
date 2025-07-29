import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../Provider/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const axios = useAxiosSecure();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `/reviews?email=${user.email}`
        );
        setReviews(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load reviews");
      }
    };

    if (user?.email) {
      fetchReviews();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/reviews/${id}`);
      setReviews(reviews.filter((r) => r._id !== id));
      toast.success("Review deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded p-4 flex flex-col gap-2"
            >
              <h3 className="font-semibold">{review.donationTitle}</h3>
              <p>Restaurant: {review.restaurantName}</p>
              <p>{review.description}</p>
              <p className="text-sm text-gray-600">Reviewed: {new Date(review.createdAt).toLocaleDateString()}</p>
              <button
                onClick={() => handleDelete(review._id)}
                className="bg-red-600 text-white px-3 py-1 rounded self-start"
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;