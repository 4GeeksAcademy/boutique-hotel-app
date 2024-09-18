import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Testimonial = ({ name, role, quote, avatarUrl }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-background' : 'bg-background-light'} p-6 rounded-lg shadow-lg`}>
      <div className="flex items-center mb-4">
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-16 h-16 rounded-full mr-4 object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-text font-sans">{name}</h3>
          <p className="text-primary font-sans">{role}</p>
        </div>
      </div>
      <p className="text-text-light italic font-serif">"{quote}"</p>
    </div>
  );
};

export default Testimonial;