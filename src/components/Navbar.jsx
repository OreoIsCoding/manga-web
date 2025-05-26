import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md text-gray-200 shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
              MangaWeb
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
            <NavLink to="/home" icon="home" active={location.pathname === '/home'}>Home</NavLink>
            <NavLink to="/manga/popular" icon="star" active={location.pathname === '/manga/popular'}>Popular</NavLink>
            <NavLink to="/manga/latest" icon="clock" active={location.pathname === '/manga/latest'}>Latest</NavLink>
            <NavLink to="/manga/random" icon="random" active={location.pathname === '/manga/random'}>Random</NavLink>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Icon name="search" />
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative group p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between transform transition-transform duration-300">
              <span className={`w-6 h-0.5 bg-current transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-current transform transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-3 space-y-1">
            <MobileNavLink to="/home" icon="home">Home</MobileNavLink>
            <MobileNavLink to="/search" icon="search">Search</MobileNavLink>
            <MobileNavLink to="/manga/random" icon="random">Random</MobileNavLink>
            <MobileNavLink to="/about" icon="info">About</MobileNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

const SearchBar = ({ isOpen, setIsOpen }) => (
  <div className={`relative transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'}`}>
    <input
      type="text"
      placeholder="Search manga..."
      className={`w-full bg-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    />
  </div>
);

const ThemeToggle = () => (
  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
    <Icon name="theme" />
  </button>
);

const NavLink = ({ to, children, icon, active }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg text-gray-300 transition-all duration-200 flex items-center space-x-2 ${
      active 
        ? 'bg-white/15 text-white font-medium' 
        : 'hover:text-white hover:bg-white/10'
    }`}
  >
    <Icon name={icon} />
    <span>{children}</span>
  </Link>
);

const MobileNavLink = ({ to, children, icon }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-lg flex items-center space-x-3"
  >
    <Icon name={icon} />
    <span>{children}</span>
  </Link>
);

const Icon = ({ name }) => {
  const icons = {
    home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    random: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />,
    info: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    star: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    theme: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />,
  };

  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

export default Navbar;
