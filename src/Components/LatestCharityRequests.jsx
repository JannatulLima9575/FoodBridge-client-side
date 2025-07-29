import React, { useEffect, useState } from 'react';
import useAxiosSecure from "../hooks/useAxiosSecure";

const LatestCharityRequests = () => {
  const [charityRequests, setCharityRequests] = useState([]);
  const axios = useAxiosSecure();

  useEffect(() => {
    axios
      .get("/charityRequests")
      .then((res) => {
        // show latest 3 only
        const latest = res.data.slice(-3).reverse();
        setCharityRequests(latest);
      })
      .catch((err) => {
        console.error("Error fetching charity requests:", err);
      });
  }, []);

  return (
    <section className="py-12 px-4 md:px-8 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#257429] dark:text-[#c8facc] font-[Poppins]">
          🤝 Latest Charity Requests
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 fonts-inter">
          See what charities near you are requesting to help those in need.
        </p>

        {charityRequests.length === 0 ? (
          <p className="text-center text-gray-500">No charity requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {charityRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white dark:bg-neutral shadow-lg hover:shadow-xl transition-all rounded-xl p-6 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={request.charityImage}
                    alt={request.charityName}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <h3 className="text-lg font-semibold font-[Poppins] text-[#1e1e1e] dark:text-white">
                    {request.charityName}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 fonts-inter">
                  {request.requestDescription}
                </p>
                <p className="text-sm fonts-inter">
                  <span className="font-medium">Requested Food:</span>{' '}
                  <span className="italic">{request.foodTitle || 'N/A'}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestCharityRequests;