import React from 'react';
import { Skull, Ghost, Sparkles } from 'lucide-react';
import Section from './Section';
import Card from './Card';

const MysteriousContent = () => {
  const items = [
    { icon: Skull, title: "Ancient Curses", description: "Delve into the dark history of forgotten curses that still linger in the shadows." },
    { icon: Ghost, title: "Spectral Encounters", description: "Witness the ethereal world of spirits and learn to communicate with the beyond." },
    { icon: Sparkles, title: "Mystical Artifacts", description: "Discover powerful relics imbued with arcane energies from long-lost civilizations." }
  ];

  return (
    <Section title="Uncover the Secrets" className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {items.map((item, index) => (
          <Card key={index} className="transform hover:scale-105 transition-transform duration-300">
            <item.icon className="w-16 h-16 mb-6 text-purple-500 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4 text-center">{item.title}</h3>
            <p className="text-gray-400 text-center">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default MysteriousContent;