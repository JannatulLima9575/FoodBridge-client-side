import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
      </Elements>
    </div>
  );
};

export default Payment;