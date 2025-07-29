import React, { useState, useContext } from "react";
// import AuthContext from "../Provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ReviewModal = ({ user, donationId, onClose,isOpen }) => {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const axios = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      donationId,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      description,
      rating,
    };
    await axios.post("/reviews", review);
    toast.success("Review Submitted!");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}
     className={`${isOpen ? 'block' : 'hidden'} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-base-100 rounded shadow`}>

      <h3 className="text-lg font-semibold mb-4">Add a Review</h3>
      <p className="text-sm mb-2">Your Name: {user.displayName}</p>
      <p className="text-sm mb-4">Your Email: {user.email}</p>
      <textarea
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write your review..."
        className="textarea textarea-bordered w-full mb-4"
      />
      <input
        type="number"
        min={1}
        max={5}
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <button type="submit" className="btn btn-primary">Submit</button>
      <button type="button" onClick={()=>onClose()} className="btn btn-primary">Close</button>
    </form>
  );
};

export default ReviewModal;