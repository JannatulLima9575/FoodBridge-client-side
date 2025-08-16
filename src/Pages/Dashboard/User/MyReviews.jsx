import React, { useEffect, useState } from "react";
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
        const res = await axios.get(`/reviews?email=${user.email}`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load reviews");
      }
    };

    if (user?.email) {
      fetchReviews();
    }
  }, [user, axios]);

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
    <div className="p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border border-gray-200 shadow-sm rounded-lg p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-primary mb-1 dark:text-gray-300">
                  Donation: {review.title || review.donationId}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium ">Restaurant:</span> {review.reviewerName}
                </p>
                <p className="text-gray-800 my-2 dark:text-gray-300">{review.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-300">
                  Reviewed on:{" "}
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={() => handleDelete(review._id)}
                className="mt-4 px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition self-start"
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