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
    const confirmDelete = confirm("Are you sure you want to delete this request?");
    if (!confirmDelete) return;

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
      <h2 className="text-2xl font-bold mb-4">Manage All Requests</h2>

      {Array.isArray(requests) && requests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Donation Title</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th>Request Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.donationTitle || "N/A"}</td>
                  <td>{req.charityName || "N/A"}</td>
                  <td>{req.charityEmail || "N/A"}</td>
                  <td>{req.requestDescription || "N/A"}</td>
                  <td className="capitalize">{req.status}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-sm btn-error"
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
        <p className="text-center text-gray-500">No requests found.</p>
      )}
    </div>
  );
};

export default ManageRequests;
