import React from "react";

const Transactions = () => {
  const transactions = [
    {
      id: "txn_12345",
      amount: "$25",
      date: "2025-07-18",
      status: "Pending",
    },
    // ... more dummy data
  ];

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Transaction ID</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="text-center">
              <td className="py-2 px-4 border">{tx.id}</td>
              <td className="py-2 px-4 border">{tx.amount}</td>
              <td className="py-2 px-4 border">{tx.date}</td>
              <td className="py-2 px-4 border">{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;