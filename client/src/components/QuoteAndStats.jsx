import React from 'react';

const QuoteAndStats = ({ quote, author, stats }) => {
  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <blockquote className="text-2xl font-semibold italic text-center mb-8">
          "{quote}"
          <footer className="text-lg mt-2">— {author}</footer>
        </blockquote>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-purple-500">{stat.value}</div>
              <div className="text-xl mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuoteAndStats;