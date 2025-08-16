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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this request?")) return;

    try {
      const res = await axiosSecure.delete(`/donation-requests/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Request deleted successfully");
        refetch();
      } else {
        toast.error("Failed to delete request");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while deleting");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-[#257429] dark:text-orange-500">
        📋 Manage All Requests
      </h2>

      {Array.isArray(requests) && requests.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
          <table className="table w-full">
            <thead className="bg-green-500 dark:bg-orange-500 text-white">
              <tr>
                <th>#</th>
                <th>Donation Title</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th>Request Description</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr
                  key={req._id}
                  className="hover:bg-green-50 dark:hover:bg-orange-50 transition-colors"
                >
                  <td>{index + 1}</td>
                  <td>{req.donationTitle || "N/A"}</td>
                  <td>{req.charityName || "N/A"}</td>
                  <td>{req.charityEmail || "N/A"}</td>
                  <td>{req.requestDescription || "N/A"}</td>
                  <td className="capitalize">{req.status}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-sm bg-orange-500 dark:bg-green-500 hover:bg-orange-600 dark:hover:bg-green-600 text-white border-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No requests found.
        </p>
      )}
    </div>
  );
};

export default ManageRequests;