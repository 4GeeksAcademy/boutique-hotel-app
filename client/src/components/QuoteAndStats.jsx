import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const QuoteAndStats = ({ quote, author, stats }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-background-dark' : 'bg-background-light'} text-text py-16`}>
      <div className="container mx-auto px-4">
        <blockquote className="text-2xl font-semibold italic text-center mb-8 font-serif">
          "{quote}"
          <footer className="text-lg mt-2 font-sans">— {author}</footer>
        </blockquote>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-xl mt-2 font-sans">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuoteAndStats;