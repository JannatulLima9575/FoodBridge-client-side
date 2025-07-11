import DonationDetailsMap from "./DonationDetailsMap";

const DonationDetails = () => {
  const donation = {
    foodType: "Prepared Meals",
    restaurant: "Daily Dine",
    location: "Sylhet",
    latitude: 24.8949,
    longitude: 91.8687,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary">🍱 {donation.foodType}</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Restaurant: {donation.restaurant}
      </p>
      <p>Location: {donation.location}</p>

      {/* Mapbox Map */}
      <DonationDetailsMap
        latitude={donation.latitude}
        longitude={donation.longitude}
      />
    </div>
  );
};

export default DonationDetails;