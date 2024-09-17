import React from 'react';

const Testimonial = ({ name, role, quote, avatarUrl }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-16 h-16 rounded-full mr-4 object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-purple-400">{role}</p>
        </div>
      </div>
      <p className="text-gray-300 italic">"{quote}"</p>
    </div>
  );
};

export default Testimonial;