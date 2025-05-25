import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-gray-200 shadow-xl sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MangaWeb
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="text-gray-300 hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/search" className="text-gray-300 hover:text-blue-400 transition-colors">Search</Link>
            <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link to="/home" className="hover:text-blue-400 transition-colors px-2 py-1">Home</Link>
              <Link to="/search" className="hover:text-blue-400 transition-colors px-2 py-1">Search</Link>
              <Link to="/about" className="hover:text-blue-400 transition-colors px-2 py-1">About</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
