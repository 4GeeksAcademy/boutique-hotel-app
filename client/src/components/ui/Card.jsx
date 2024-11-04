import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  title, 
  subtitle,
  footer 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="p-4 border-b">
          {title && (
            <h3 className="text-xl font-semibold text-text-dark">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-text-light mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="p-4 border-t bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 