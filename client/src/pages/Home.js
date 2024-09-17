import React from 'react';
import Hero from '../components/Hero';
import QuoteAndStats from '../components/QuoteAndStats';
import MysteriousContent from '../components/MysteriousContent';
import MysterySlider from '../components/MysterySlider';
import TestimonialSection from '../components/TestimonialSection';
import MagicTornadoHero from '../components/MagicTornadoHero';

function Home() {
  const quoteData = {
    quote: "The universe is full of magical things patiently waiting for our wits to grow sharper.",
    author: "Eden Phillpotts",
    stats: [
      { value: "1000+", label: "Mysteries Solved" },
      { value: "500", label: "Active Quests" },
      { value: "10,000", label: "Adventurers" }
    ]
  };

  return (
    <div>
      <Hero />
      <QuoteAndStats {...quoteData} />
      <MysteriousContent />
      <MysterySlider />
      <TestimonialSection />
      <MagicTornadoHero>
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Unleash the Magic</h2>
          <p className="text-xl mb-8">Dive into a world of swirling mysteries and enchanting discoveries.</p>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
            Explore the Vortex
          </button>
        </div>
      </MagicTornadoHero>
    </div>
  );
}

export default Home;