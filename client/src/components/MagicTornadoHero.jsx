import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MagicTornadoHero.css';
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from '../contexts/ThemeContext';

const magicalFacts = [
  "The average person spends 6 months of their life waiting for red lights to turn green.",
  "The world's oldest known living tree is over 5,000 years old.",
  "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "The Great Wall of China is not visible from space with the naked eye.",
  "A day on Venus is longer than its year.",
  "The human brain is more active during sleep than during the day."
];

const MagicTornadoHero = () => {
  const { isDarkMode } = useTheme();
  const [isInView, setIsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && isInView) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / viewportHeight)));
        setScrollProgress(progress);
      }
    };
  
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % magicalFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getContentStyle = () => ({
    transform: `translateY(${(1 - scrollProgress) * 30}px)`,
    opacity: Math.min(scrollProgress * 2, 1),
  });
  
  const getFactStyle = () => ({
    transform: `translateY(${(1 - scrollProgress) * 20}px)`,
    opacity: Math.max(scrollProgress * 3, 0),
  });
  
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    particles: {
      color: {
        value: "#3B82F6", // Changed to blue
      },
      links: {
        color: "#60A5FA", // Lighter blue for links
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  return (
    <div ref={sectionRef} className={`magic-tornado-hero relative overflow-hidden ${isDarkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
      <TornadoBackground />
      <Content 
        contentStyle={getContentStyle()} 
        factStyle={getFactStyle()} 
        currentFact={magicalFacts[currentFactIndex]} 
      />
    </div>
  );
};

const TornadoBackground = () => (
  <div className="tornado-background absolute inset-0">
    {[...Array(10)].map((_, index) => (
      <div 
        key={index} 
        className={`tornado-layer tornado-layer-${index + 1}`}
        style={{ 
          animationDelay: `${index * 0.2}s`,
          transform: `rotateY(${index * 36}deg) translateZ(${50 + index * 10}px)`
        }}
      ></div>
    ))}
  </div>
);

const Content = ({ contentStyle, factStyle, currentFact }) => (
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-16">
    <div className="text-center text-white transition-all duration-500 ease-out mb-16" style={contentStyle}>
      <h2 className="text-5xl font-bold mb-4 font-sans">Unleash the Magic of Knowledge</h2>
      <p className="text-xl mb-8 font-sans">Dive into a world of swirling mysteries and enchanting discoveries.</p>
      <p className="text-lg mb-8 font-sans">Our magical vortex brings you fascinating facts from across the universe, challenging your perception and expanding your mind.</p>
      <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors mr-4">
        Explore the Vortex
      </button>
      <button className="bg-transparent text-white border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors">
        Learn More
      </button>
    </div>
    <div className="text-white mt-16 max-w-2xl mx-auto" style={factStyle}>
      <div className="magical-fact p-6 rounded-lg shadow-lg transition-all duration-500 ease-out">
        <h3 className="text-2xl font-semibold mb-4 font-sans">Did You Know?</h3>
        <p className="text-lg font-sans">{currentFact}</p>
      </div>
    </div>
  </div>
);

export default MagicTornadoHero;