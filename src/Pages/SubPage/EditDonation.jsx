import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const EditDonation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔄 Fetch donation data to pre-fill form
  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/donations/${id}`);
        reset(res.data); // 🔁 Pre-fill form
        setLoading(false);
      } catch (error) {
        toast.error("❌ Failed to load donation");
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id, reset]);

  // ✅ Submit updated data
  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`http://localhost:5000/donations/${id}`, data);
      if (res.status === 200) {
        toast.success("✅ Donation updated successfully!");
        navigate("/dashboard/my-donations");
      }
    } catch (error) {
      toast.error("❌ Update failed");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <section className="py-10 px-4 bg-white dark:bg-neutral-900 min-h-screen">
      <div className="max-w-xl mx-auto bg-base-100 dark:bg-neutral p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#257429] mb-6">✏️ Edit Donation</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="font-medium">Donation Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
          </div>

          {/* Quantity */}
          <div>
            <label className="font-medium">Quantity (kg)</label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.quantity && <p className="text-red-500 text-sm">Quantity is required</p>}
          </div>

          {/* Location */}
          <div>
            <label className="font-medium">Location</label>
            <input
              type="text"
              {...register("location", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.location && <p className="text-red-500 text-sm">Location is required</p>}
          </div>

          {/* Image */}
          <div>
            <label className="font-medium">Image URL</label>
            <input
              type="text"
              {...register("image")}
              className="input input-bordered w-full"
            />
          </div>

          {/* Pickup Time */}
          <div>
            <label className="font-medium">Pickup Time</label>
            <input
              type="text"
              {...register("pickupTime")}
              className="input input-bordered w-full"
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success w-full">
            Update Donation
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditDonation;