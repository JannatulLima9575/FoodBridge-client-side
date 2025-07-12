import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const ViewRequests = () => {
  const { user } = useContext(AuthContext);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["charity-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/charity-requests?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">📄 Requested Donations</h2>

      <div className="grid gap-4">
        {requests.map((req, index) => (
          <div key={index} className="p-4 border rounded-md shadow-sm bg-base-100 dark:bg-neutral">
            <div className="flex items-center gap-4">
              <img src={req.charityImage} alt="" className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-bold">{req.charityName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{req.requestDescription}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewRequests;