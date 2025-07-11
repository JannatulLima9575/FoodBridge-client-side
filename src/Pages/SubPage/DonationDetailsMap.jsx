import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// 🔐 Set your token here
mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const DonationDetailsMap = ({ latitude, longitude }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude], // [lng, lat]
      zoom: 12,
    });

    // Marker
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    return () => map.remove(); // Clean up map
  }, [latitude, longitude]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[400px] rounded-xl shadow-md border"
    />
  );
};

export default DonationDetailsMap;