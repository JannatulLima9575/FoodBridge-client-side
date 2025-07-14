// src/Pages/Dashboard/Payments/PaymentSuccess.jsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, Link } from "react-router";

const PaymentSuccess = () => {
  const location = useLocation();
  const { transactionId, amount } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-gray-900 px-4">
      <FaCheckCircle className="text-green-500 dark:text-green-400 text-6xl mb-4 animate-bounce" />
      <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">Payment Successful!</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">Amount Paid: ${amount / 100}</p>
      <p className="text-md font-mono text-gray-600 dark:text-gray-400 mb-4">Transaction ID: {transactionId}</p>
      <Link to="/dashboard/my-payments">
        <button className="btn btn-success">View My Payments</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;