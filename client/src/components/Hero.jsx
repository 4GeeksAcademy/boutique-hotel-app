import React from 'react';
import { Moon, Stars } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-[700px] bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black" />
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <Stars
            key={i}
            className="absolute text-white animate-geometric-twinkle"
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
        <Moon className="w-16 h-16 mb-8 text-yellow-300 animate-pulse" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Unveil the Mystery
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
          Embark on a journey through the unknown. Discover secrets hidden in the
          shadows and unlock the power of the enigma.
        </p>
        <div className="space-x-4">
          <button className="bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors px-6 py-3 rounded-full font-semibold">
            Begin Your Quest
          </button>
          <button className="text-white hover:text-gray-300 transition-colors px-6 py-3 font-semibold">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
} 