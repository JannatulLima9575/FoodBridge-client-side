// MapView.jsx
import React from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapView = ({ lat, lng }) => {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow">
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 12,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <Marker longitude={lng} latitude={lat} />
      </Map>
    </div>
  );
};

export default MapView;