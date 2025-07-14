// src/Pages/Dashboard/Payments/MyPayments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../Provider/useAuth";

const MyPayments = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/payments?email=${user.email}`)
        .then((res) => setPayments(res.data));
    }
  }, [user]);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border text-center">${(payment.amount / 100).toFixed(2)}</td>
                <td className="px-4 py-2 border font-mono text-center text-blue-600 dark:text-blue-400">
                  {payment.transactionId}
                </td>
                <td className="px-4 py-2 border text-center">
                  {new Date(payment.date).toLocaleString()}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">No payments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPayments;