import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../Provider/useAuth';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    amount: '',
    name: user?.displayName || '',
    email: user?.email || '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

    const amountInCents = parseFloat(formData.amount) * 100;
    setLoading(true);

    try {
      // ✅ Create payment intent from backend
      const res = await axiosSecure.post('/create-payment-intent', {
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
        setSuccess('');
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setSuccess('Payment successful!');
          setError('');

          // ✅ Save payment info to backend
          await axiosSecure.post('/payments', {
            amount: formData.amount,
            email: formData.email,
            transactionId: result.paymentIntent.id,
          });

          // Optionally reset form
          setFormData({
            amount: '',
            name: user?.displayName || '',
            email: user?.email || '',
          });
        }
      }
    } catch (err) {
      setError(err.message);
      setSuccess('');
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
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Amount (USD)</label>
          <input
            type="number"
            name="amount"
            required
            value={formData.amount}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Card Details</label>
          <CardElement />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
          disabled={!stripe || loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;