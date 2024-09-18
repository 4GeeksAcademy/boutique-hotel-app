import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from './Section';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const mysteries = [
  {
    title: "The Lost City of Atlantis",
    description: "An ancient civilization submerged beneath the waves, waiting to be rediscovered.",
    image: "https://source.unsplash.com/random/800x600?atlantis"
  },
  {
    title: "The Bermuda Triangle",
    description: "A region of the Atlantic Ocean where ships and planes seem to vanish without a trace.",
    image: "https://source.unsplash.com/random/800x600?ocean"
  },
  {
    title: "The Voynich Manuscript",
    description: "An illustrated codex hand-written in an unknown writing system, defying all attempts at deciphering.",
    image: "https://source.unsplash.com/random/800x600?manuscript"
  }
];

const MysterySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDarkMode } = useTheme();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mysteries.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mysteries.length) % mysteries.length);
  };

  return (
    <Section title="Explore the Unknown" className={`${isDarkMode ? 'bg-background-dark' : 'bg-background-light'} text-dark`}>
      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-xl"
          >
            <img
              src={mysteries[currentIndex].image}
              alt={mysteries[currentIndex].title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold mb-2 font-sans text-white">{mysteries[currentIndex].title}</h3>
              <p className="text-white font-sans">{mysteries[currentIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {mysteries.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentIndex ? 'bg-primary' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </Section>
  );
};

export default MysterySlider;