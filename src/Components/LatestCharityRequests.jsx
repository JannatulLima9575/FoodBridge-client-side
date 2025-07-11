import React from 'react';

const charityRequests = [
  {
    id: 1,
    charityName: 'Hope Foundation',
    charityImage: '/assets/charity1.png',
    requestDescription: 'We are organizing a community event and need fresh produce to serve 100 people.',
    foodTitle: 'Fresh Vegetables & Fruits',
  },
  {
    id: 2,
    charityName: 'Food for All',
    charityImage: '/assets/charity2.png',
    requestDescription: 'Looking for bakery items for our weekend shelter meal program.',
    foodTitle: 'Bakery Surplus',
  },
  {
    id: 3,
    charityName: 'Helping Hands BD',
    charityImage: '/assets/charity3.png',
    requestDescription: 'In need of prepared meals to distribute in underprivileged areas.',
    foodTitle: 'Prepared Meal Boxes',
  },
];

const LatestCharityRequests = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
        🤝 Latest Charity Requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {charityRequests.map((request) => (
          <div key={request.id} className="bg-white dark:bg-neutral shadow-md rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={request.charityImage}
                alt={request.charityName}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <h3 className="text-xl font-semibold">{request.charityName}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{request.requestDescription}</p>
            <p className="text-sm">
              <span className="font-medium">Requested Food:</span>{' '}
              <span className="italic">{request.foodTitle}</span>
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default LatestCharityRequests;