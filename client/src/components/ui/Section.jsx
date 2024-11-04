import React from 'react';

const Section = ({ 
  children, 
  className = '', 
  title, 
  subtitle,
  containerClassName = 'max-w-7xl'
}) => {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-dark mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-text-light max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;