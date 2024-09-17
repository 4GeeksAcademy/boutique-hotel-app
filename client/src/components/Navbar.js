import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Mystery App</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-300 transition-colors">About</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;