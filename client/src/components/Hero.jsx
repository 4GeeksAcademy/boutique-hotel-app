import React from 'react';
import { Moon, Stars } from "lucide-react";
import Button from './Button';
import { useTheme } from '../contexts/ThemeContext';

export default function Hero() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`relative min-h-[700px] ${isDarkMode ? 'bg-background-dark' : 'bg-background-light'} text-text overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-primary-dark to-background-dark' : 'from-primary-light to-background-light'}`} />
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <Stars
            key={i}
            className="absolute text-primary animate-geometric-twinkle"
            size={Math.random() * 2 + 1}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[700px] px-4 text-center">
        <Moon className="w-16 h-16 mb-8 text-secondary animate-pulse" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight font-sans">
          Unveil the Mystery
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-text-light font-sans">
          Embark on a journey through the unknown. Discover secrets hidden in the
          shadows and unlock the power of the enigma.
        </p>
        <div className="space-x-4">
          <Button variant="primary">Begin Your Quest</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </div>
  );
}