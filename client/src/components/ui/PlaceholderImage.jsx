import React from 'react';

const PlaceholderImage = ({ text = 'Image', width = 192, height = 192 }) => {
  return (
    <div 
      className="flex items-center justify-center bg-gray-200"
      style={{ width, height }}
    >
      <span className="text-gray-400">{text}</span>
    </div>
  );
};

export default PlaceholderImage; 