// src/Pages/Dashboard/Payment.jsx
import React from 'react';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
  const price = 25; // 🧪 Set any amount or get dynamically

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Complete Your Donation</h2>
        <CheckoutForm price={price} />
      </div>
    </div>
  );
};

export default Payment;