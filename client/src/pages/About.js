import React from 'react';
import EnhancedPropertyDetails from '../components/EnhancedPropertyDetails';
import Section from '../components/Section';
import { WifiIcon, TvIcon, CoffeeIcon, UtensilsIcon, CarIcon } from 'lucide-react';
import Experience from '../components/Experience';

function About() {
  const propertyData = {
    name: "Cozy Cottage Retreat",
    price: 150,
    rating: 4.8,
    reviewCount: 42,
    images: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600'
    ],
    amenities: [
      { icon: <WifiIcon className="h-5 w-5" />, name: 'Free Wi-Fi' },
      { icon: <TvIcon className="h-5 w-5" />, name: 'Smart TV' },
      { icon: <CoffeeIcon className="h-5 w-5" />, name: 'Coffee Maker' },
      { icon: <UtensilsIcon className="h-5 w-5" />, name: 'Full Kitchen' },
      { icon: <CarIcon className="h-5 w-5" />, name: 'Free Parking' },
      { name: 'Swimming Pool' },
    ],
    description: "Experience the charm of our cozy cottage retreat, nestled in the heart of nature. This beautiful property offers a perfect blend of rustic charm and modern comfort. Enjoy breathtaking views, peaceful surroundings, and all the amenities you need for a relaxing getaway.",
    reviews: [
      { author: 'John D.', rating: 5, comment: 'Absolutely wonderful stay! The cottage was perfect.' },
      { author: 'Sarah M.', rating: 4, comment: 'Beautiful location and great amenities. Highly recommend.' },
    ],
    details: {
      Type: "Cottage",
      "Max Guests": 4,
      Bedrooms: 2,
      Bathrooms: 1,
      "Check-in": "After 3:00 PM",
      "Check-out": "Before 11:00 AM"
    }
  };

  return (
    <div className="bg-background text-text">
      <Section title="About Our Property" className="bg-background-light">
        <EnhancedPropertyDetails property={propertyData} />
      </Section>
      <Section title="Experience Tranquil Haven" className="bg-background">
        <Experience />
      </Section>
    </div>
  );
}

export default About;