import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/donation-requests/approve/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Request Approved");
        refetch();
      }
    } catch (err) {
      toast.error("Approval Failed");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/donation-requests/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Request Rejected");
        refetch();
      }
    } catch (err) {
      toast.error("Rejection Failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage All Requests</h2>

      {Array.isArray(requests) && requests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Donation</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.userName}</td>
                  <td>{req.donationTitle}</td>
                  <td>{req.quantity}</td>
                  <td className="capitalize">{req.status}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleApprove(req._id)}
                      disabled={req.status === "approved"}
                      className="btn btn-sm btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      disabled={req.status === "rejected"}
                      className="btn btn-sm btn-error"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No requests found.</p>
      )}
    </div>
  );
};

export default ManageRequests;