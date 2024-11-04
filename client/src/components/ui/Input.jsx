import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-text-dark text-sm font-bold mb-2">
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input; 