import React from 'react';

const Section = ({ title, children, className = '' }) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}
        {children}
      </div>
    </section>
  );
};

export default Section;