import React from 'react';
import { Link } from 'react-router';

const featuredDonations = [
  {
    id: 1,
    image: '/assets/bakery.jpg',
    foodType: 'Bakery',
    restaurant: 'Fresh Bites',
    location: 'Dhaka, Bangladesh',
    status: 'Available',
  },
  {
    id: 2,
    image: '/assets/produce.jpg',
    foodType: 'Produce',
    restaurant: 'Green Valley',
    location: 'Sylhet, Bangladesh',
    status: 'Picked Up',
  },
  {
    id: 3,
    image: '/assets/meals.jpg',
    foodType: 'Prepared Meals',
    restaurant: 'Daily Dine',
    location: 'Chittagong, Bangladesh',
    status: 'Available',
  },
  {
    id: 4,
    image: '/assets/dairy.jpg',
    foodType: 'Dairy',
    restaurant: 'Milk & More',
    location: 'Rajshahi, Bangladesh',
    status: 'Available',
  },
];

const FeaturedDonations = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-base-100">
        <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
        🍽️ Featured Donations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredDonations.map((donation) => (
          <div key={donation.id} className="bg-white dark:bg-neutral shadow-lg rounded-xl overflow-hidden">
            <img
              src={donation.image}
              alt={donation.foodType}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{donation.foodType}</h3>
              <p className="text-sm">
                <span className="font-medium">Restaurant:</span> {donation.restaurant}
              </p>
              <p className="text-sm">
                <span className="font-medium">Location:</span> {donation.location}
              </p>
              <p className="text-sm">
                <span className="font-medium">Status:</span>{' '}
                <span className={`font-bold ${donation.status === 'Available' ? 'text-green-600' : 'text-orange-500'}`}>
                  {donation.status}
                </span>
              </p>
              <Link
                to={`/donation-details/${donation.id}`}
                className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default FeaturedDonations;