import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PaymentHistory = () => {
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/payments");
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">💳 Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.userEmail}</td>
                <td>${p.amount}</td>
                <td>{new Date(p.date).toLocaleDateString()}</td>
                <td>{p.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;