import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-900 p-6 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;