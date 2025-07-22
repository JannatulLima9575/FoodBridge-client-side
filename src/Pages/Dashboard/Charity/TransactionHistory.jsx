import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AuthContext  from "../../../Provider/AuthContext";

const TransactionHistory = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/api/transactions?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const transactions = Array.isArray(data) ? data : [];

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="w-full border">
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
              <tr key={t._id}>
                <td className="p-2 border">{t.transactionId}</td>
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
