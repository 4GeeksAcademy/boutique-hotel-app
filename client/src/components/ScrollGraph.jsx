import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ScrollGraph = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { isDarkMode } = useTheme();

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

  const backgroundClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
  const progressClass = isDarkMode ? 'bg-blue-400' : 'bg-blue-600';

  return (
    <div className={`fixed left-0 bottom-0 w-full h-1 ${backgroundClass}`}>
      <div 
        className={`h-full ${progressClass} transition-all duration-300 ease-out`}
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};

export default ScrollGraph;