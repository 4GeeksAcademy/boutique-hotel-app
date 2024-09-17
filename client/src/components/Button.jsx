import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-colors';
  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-transparent text-white border border-white hover:bg-white hover:text-black',
    tertiary: 'text-white hover:text-gray-300',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;