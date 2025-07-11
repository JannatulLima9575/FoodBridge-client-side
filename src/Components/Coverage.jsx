import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon issue for Leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Sample Districts (you can add all 64)
const districts = [
  { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
  { name: "Chittagong", lat: 22.3569, lng: 91.7832 },
  { name: "Sylhet", lat: 24.8949, lng: 91.8687 },
  { name: "Rajshahi", lat: 24.3745, lng: 88.6042 },
  { name: "Khulna", lat: 22.8456, lng: 89.5403 },
  { name: "Barisal", lat: 22.701, lng: 90.3535 },
  { name: "Rangpur", lat: 25.746, lng: 89.25 },
  { name: "Mymensingh", lat: 24.7471, lng: 90.4203 },
  { name: "Comilla", lat: 23.4607, lng: 91.1809 },
  { name: "Jessore", lat: 23.17, lng: 89.2 },
];

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDistricts = districts.filter((district) =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full min-h-screen md:h-[60vh] bg-white dark:bg-neutral-900 px-4 md:px-8 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#257429] dark:text-[#c8facc] mb-4 font-[Poppins] text-center">
          📍 We are available in 64 Districts
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 fonts-inter text-center text-sm md:text-base">
          Our food donation coverage spans every corner of Bangladesh — search and explore our active areas.
        </p>

        {/* Search Box */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search district name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full max-w-md text-black dark:text-white dark:bg-neutral"
          />
        </div>

        {/* Map Section */}
        <div className="w-full h-[70vh] md:h-[80vh] rounded-xl overflow-y-hidden shadow-xl border border-green-200 dark:border-neutral-700">
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={7}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredDistricts.map((district, index) => (
              <Marker key={index} position={[district.lat, district.lng]}>
                <Popup>
                  <strong>{district.name}</strong> <br />
                  We are actively serving here!
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Coverage;