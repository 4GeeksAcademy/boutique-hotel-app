import React from 'react';
import Testimonial from './Testimonial';
import Section from './Section';

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Mystery Enthusiast",
    quote: "This app has opened my eyes to a world of hidden wonders. I've never felt more excited about uncovering secrets!",
    avatarUrl: "https://source.unsplash.com/random/100x100?portrait=1"
  },
  {
    name: "Bob Smith",
    role: "Amateur Detective",
    quote: "The mysteries presented here are mind-bending. It's like having a pocket full of unsolved cases wherever I go.",
    avatarUrl: "https://source.unsplash.com/random/100x100?portrait=2"
  },
  {
    name: "Carol Davis",
    role: "History Buff",
    quote: "I've learned more about hidden historical events through this app than I did in years of study. Absolutely fascinating!",
    avatarUrl: "https://source.unsplash.com/random/100x100?portrait=3"
  }
];

const TestimonialSection = () => {
  return (
    <Section title="What Our Users Say" className="bg-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </Section>
  );
};

export default TestimonialSection;