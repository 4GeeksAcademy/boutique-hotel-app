import React from 'react';
import Section from '../components/ui/Section';

function About() {
  return (
    <div className="bg-background text-text">
      <Section 
        title="About Our Hotel" 
        subtitle="A legacy of luxury and excellence"
        className="bg-background-light"
      >
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg text-text-light">
            <p className="mb-6">
              Experience luxury and comfort in our carefully designed accommodations.
              Our hotel offers a perfect blend of modern amenities and traditional hospitality.
            </p>
            <p className="mb-6">
              Located in a prime location, we provide easy access to local attractions
              while ensuring a peaceful and relaxing stay for our guests.
            </p>
          </div>
        </div>
      </Section>

      <Section 
        title="Our Services" 
        subtitle="Committed to excellence"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "24/7 Service",
              description: "Round-the-clock support for all your needs"
            },
            {
              title: "Fine Dining",
              description: "Exquisite culinary experiences"
            },
            {
              title: "Wellness Center",
              description: "State-of-the-art fitness and spa facilities"
            }
          ].map((service, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-white rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3 text-text-dark">
                {service.title}
              </h3>
              <p className="text-text-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default About;