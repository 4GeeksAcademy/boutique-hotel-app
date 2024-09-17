import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Mystery App</h3>
            <p className="text-gray-400">Uncover the secrets of the unknown</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-purple-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-purple-500 transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-purple-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
  <button className="hover:text-purple-500 transition-colors"><Facebook size={24} /></button>
  <button className="hover:text-purple-500 transition-colors"><Twitter size={24} /></button>
  <button className="hover:text-purple-500 transition-colors"><Instagram size={24} /></button>
</div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2023 Mystery App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;