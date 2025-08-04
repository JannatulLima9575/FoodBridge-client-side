import React, { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../Provider/AuthContext";
import toast from "react-hot-toast";

const ViewRequests = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["Res_charityRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/charityRequests`);
      return res.data;
    },
  });

  console.log("Charity Requests Data:", requests);
  

  const handleStatusChange = async (requestId, status) => {
    try {
      const res = await axios.patch(`charityRequests/${requestId}`, {
        status,
      });
      if (res.data.modifiedCount > 0 || res.data.success) {
        toast.success(`Request ${status}`);
        queryClient.invalidateQueries(["Res_charityRequests", user?.email]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <p className="text-center py-6">Loading requests...</p>;

  return (
    <div className="p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Charity Requests for Your Donations
      </h2>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Donation Title</th>
                <th>Food Type</th>
                <th>Charity Name</th>
                <th>Email</th>
                <th>Pickup Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.title}</td>
                  <td>{req.foodType}</td>
                  <td>{req.charityName}</td>
                  <td>{req.charityEmail}</td>
                  <td>{req.pickupTime}</td>
                  <td>{req.status}</td>
                  <td className="space-x-2">
                    {req.status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(
                              req._id,
                              "accepted",
                            )
                          }
                          className="btn btn-sm btn-success"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(
                              req._id,
                              "rejected",
                            )
                          }
                          className="btn btn-sm btn-error"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {req.status !== "Pending" && (
                      <span className="text-gray-500">Action taken</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewRequests;
