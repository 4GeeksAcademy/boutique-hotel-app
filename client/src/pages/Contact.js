import React from 'react';
import Form from '../components/Form';
import Section from '../components/Section';

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

  return (
    <Section title="Contact Us" className="bg-gray-100">
      <p className="text-center mb-8">Get in touch with us. We'd love to hear from you!</p>
      <Form fields={fields} onSubmit={handleSubmit} submitText="Send Message" />
    </Section>
  );
}

export default Contact;