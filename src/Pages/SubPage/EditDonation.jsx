import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const EditDonation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    quantity: "",
    location: "",
    image: "",
    pickupTime: "",
  });
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch existing data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/donations/${id}`)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("❌ Failed to fetch donation");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/donations/${id}`, form);
      toast.success("✅ Donation updated successfully!");
      navigate("/dashboard/my-donations");
    } catch (error) {
      toast.error("❌ Failed to update donation");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <section className="py-10 px-4 bg-white dark:bg-neutral-900 min-h-screen">
      <div className="max-w-xl mx-auto bg-base-100 dark:bg-neutral p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#257429] mb-6">✏️ Edit Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Donation Title"
            required
          />
          <input
            className="input input-bordered w-full"
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity in kg"
            required
          />
          <input
            className="input input-bordered w-full"
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
          <input
            className="input input-bordered w-full"
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <input
            className="input input-bordered w-full"
            type="text"
            name="pickupTime"
            value={form.pickupTime}
            onChange={handleChange}
            placeholder="Pickup Time"
          />

          <button type="submit" className="btn btn-success w-full">
            Update Donation
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditDonation;