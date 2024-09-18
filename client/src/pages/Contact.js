import React from 'react';
import Form from '../components/Form';
import Section from '../components/Section';
import MysticalFAQ from '../components/MysticalFAQ';
import LocationMap from '../components/LocationMap';
import FlowingPropertyShowcase from '../components/FlowingPropertyShowcase';
import { useTheme } from '../contexts/ThemeContext';
import RentalAdventure from '../components/RentalAdventure';

function Contact() {
  const fields = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Message', name: 'message', type: 'textarea', required: true },
  ];

  const handleSubmit = (formData) => {
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add API calls or other logic here
  };

  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-10">
      <FlowingPropertyShowcase />
      <Section title="Contact Us" className={isDarkMode ? 'bg-background-dark' : 'bg-background-light'}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center mb-8 text-lg text-text">Get in touch with us. We'd love to hear from you!</p>
          <Form fields={fields} onSubmit={handleSubmit} submitText="Send Message" />
        </div>
      </Section>
      <Section className="bg-white">
        <LocationMap 
          address="123 Mystery Lane, Enigma City, EC 12345"
          lat={40.7128}
          lng={-74.0060}
        />
      </Section>
      <MysticalFAQ />
      <RentalAdventure/>
    </div>
  );
}

export default Contact;