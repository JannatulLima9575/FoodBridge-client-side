import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../Provider/useAuth";
import { Text } from "recharts";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    amount: 25,
    name: user?.displayName || "",
    email: user?.email || "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    console.log("Submitting payment with data:", formData);

    const amountInCents = parseFloat(formData.amount) * 100;
    setLoading(true);

    try {
      // ✅ Create payment intent from backend
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
      });

      const clientSecret = res.data.clientSecret;

      // ✅ Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setSuccess("");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setSuccess("Payment successful!");
          setError("");

          // ✅ Save payment info to backend
          await axiosSecure.post("/payments", {
            amount: formData.amount,
            email: formData.email,
            organization: formData.organization,
            mission: formData.mission,
            transactionId: result.paymentIntent.id,
          });

          // Optionally reset form
          setFormData({
            amount: 25,
            name: user?.displayName || "",
            email: user?.email || "",
          });
        }
      }
    } catch (err) {
      setError(err.message);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* User Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Organization Name */}
        <div>
          <label className="block font-medium mb-1">Organization Name</label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Organization name"
          />
        </div>

        {/* Mission Statement */}
        <div>
          <label className="block font-medium mb-1">Mission Statement</label>
          <textarea
            name="mission"
            value={formData.mission}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Brief mission statement..."
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Amount (USD)</label>
          <input
            type="number"
            name="amount"
            required
            readOnly
            value={formData.amount}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter amount"
          />
        </div>

        {/*          <div>
          <label className="block font-medium mb-1">Card Details</label>
          <CardElement 
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': { color: '#aab7c4' },
                    },
                    invalid: {
                        color: '#e3342f',
                        iconColor: '#e3342f',
                    },
                    },
                }}
          />
        </div>  */}

        {/* ✅ Stripe Card Element */}
        <div className="p-4  border rounded bg-gray-50 focus:ring-1 focus:ring-lime-400">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: {
                  color: "#e3342f",
                  iconColor: "#e3342f",
                },
              },
            }}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
