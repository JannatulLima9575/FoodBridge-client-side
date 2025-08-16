import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RoleRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/role-requests");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    if (!confirm("Are you sure you want to approve this request?")) return;

    try {
      const res = await axiosSecure.patch(`/role-requests/approve/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Request Approved");
        refetch();
      }
    } catch (err) {
      toast.error("Approval Failed");
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Are you sure you want to reject this request?")) return;

    try {
      const res = await axiosSecure.patch(`/role-requests/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Request Rejected");
        refetch();
      }
    } catch (err) {
      toast.error("Rejection Failed");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-[#257429] dark:text-orange-500">
        📝 Manage Role Requests
      </h2>
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <table className="table w-full bg-white dark:bg-gray-800">
          <thead className="bg-green-500 dark:bg-orange-500 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Mission</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, i) => (
              <tr
                key={r._id}
                className="hover:bg-green-50 dark:hover:bg-orange-50 transition-colors"
              >
                <td>{i + 1}</td>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.organization || "N/A"}</td>
                <td>{r.mission || "N/A"}</td>
                <td>{r.transactionId || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      r.status === "Approved"
                        ? "badge-success"
                        : r.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleApprove(r._id)}
                    disabled={r.status === "Approved" || r.status === "Rejected"}
                    className="btn btn-sm bg-green-500 dark:bg-orange-500 hover:bg-green-600 dark:hover:bg-orange-600 text-white border-none disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(r._id)}
                    disabled={r.status === "Rejected" || r.status === "Approved"}
                    className="btn btn-sm bg-orange-500 dark:bg-green-500 hover:bg-orange-600 dark:hover:bg-green-600 text-white border-none disabled:opacity-50"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleRequests;