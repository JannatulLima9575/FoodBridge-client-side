import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const ViewRequests = () => {
  const { user } = useContext(AuthContext);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["charityRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/charity-requests?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-6">Loading requests...</p>;

  return (
    <div className="p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Charity Requests for Your Donations</h2>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Charity Name</th>
                <th>Donation ID</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.charityName}</td>
                  <td>{req.donationId}</td>
                  <td>{req.requestDescription}</td>
                  <td>
                    <img src={req.charityImage} alt="charity" className="w-14 h-14 rounded-full" />
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