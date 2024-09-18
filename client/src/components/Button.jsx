import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-colors';
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    tertiary: 'text-primary hover:text-primary-dark',
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