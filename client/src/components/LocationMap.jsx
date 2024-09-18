import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const LocationMap = ({ address, lat, lng }) => {
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}`;
  const { isDarkMode } = useTheme();

  return (
    <div className={`mb-8 ${isDarkMode ? 'text-text' : 'text-text-dark'}`}>
      <h3 className="text-2xl font-semibold mb-4 font-sans">Our Location</h3>
      <p className="mb-4 font-sans">{address}</p>
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
        <iframe
          title="Property Location"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={embedUrl}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default LocationMap;