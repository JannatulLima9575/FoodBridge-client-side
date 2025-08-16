import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewSection = ({ donationId }) => {
  const [reviews, setReviews] = useState([]);
  const axios = useAxiosSecure();

  useEffect(() => {
    axios.get(`/reviewsByid/${donationId}`).then((res) => {
      setReviews(res.data);
    });
  }, [donationId]);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-3 text-[#257429] dark:text-[#F9A825]">
        📝 Reviews
      </h3>

      {reviews.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No reviews yet.</p>
      ) : (
        reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white dark:bg-neutral-800 rounded-lg p-4 mb-3 shadow-sm border border-gray-200 dark:border-neutral-700"
          >
            <h4 className="font-bold text-gray-800 dark:text-gray-100">
              {r.reviewerName}
            </h4>
            <p className="text-gray-700 dark:text-gray-300">{r.description}</p>
            <p className="text-yellow-500 font-semibold mt-1">⭐ {r.rating}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewSection;
