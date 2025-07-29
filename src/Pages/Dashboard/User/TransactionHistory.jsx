import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../Provider/AuthContext";

const TransactionHistory = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["transactions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const backendURL = "https://food-bridge-server-side.vercel.app";
      const res = await axios.get(`${backendURL}/transactions?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading transactions...</p>;

  if (isError) return <p>Error loading transactions: {error.message}</p>;

  const transactions = Array.isArray(data) ? data : [];

  return (
    <div className="mt-10 p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-green-200">
              <th className="p-2 border">Transaction ID</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Request Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id || t.transactionId}>
                <td className="p-2 border">{t.transactionId || "N/A"}</td>
                <td className="p-2 border">${t.amount}</td>
                <td className="p-2 border">{new Date(t.date).toLocaleDateString()}</td>
                <td className="p-2 border">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;