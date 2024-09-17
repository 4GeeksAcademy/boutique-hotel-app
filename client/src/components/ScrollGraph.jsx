import React, { useState, useEffect } from 'react';

const ScrollGraph = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollPercentage(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-0 bottom-0 w-full h-1 bg-gray-200">
      <div 
        className="h-full bg-purple-600 transition-all duration-300 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};

export default ScrollGraph;