import React from 'react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

function Home() {
  return (
    <div className="bg-background text-text">
      {/* Hero Section */}
      <div className="relative h-[80vh]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/hotel-hero.jpg')" }}
        ></div>
        <div className="relative z-20 h-full flex items-center justify-center text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">
              Welcome to Luxury Living
            </h1>
            <p className="text-lg md:text-xl mb-8 font-sans">
              Experience unparalleled comfort and exceptional service
            </p>
            <Button 
              to="/rooms"
              variant="primary"
              size="lg"
            >
              Book Your Stay
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Section 
        title="Experience Luxury" 
        subtitle="Discover what makes us unique"
        className="bg-background-light"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Elegant Rooms",
              description: "Beautifully designed spaces for your comfort"
            },
            {
              title: "Fine Dining",
              description: "World-class cuisine at your doorstep"
            },
            {
              title: "Premium Service",
              description: "24/7 concierge and room service"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3 text-text-dark">
                {feature.title}
              </h3>
              <p className="text-text-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured Rooms */}
      <Section 
        title="Featured Rooms" 
        subtitle="Select your perfect stay"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Room cards will be added here */}
        </div>
        <div className="text-center mt-12">
          <Button 
            to="/rooms"
            variant="outline"
            size="lg"
          >
            View All Rooms
          </Button>
        </div>
      </Section>
    </div>
  );
}

export default Home;