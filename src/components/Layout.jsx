import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({ children }) {
  const location = useLocation();
  const isReaderPage = location.pathname.includes('/chapter/');

  if (isReaderPage) {
    return children;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 text-gray-400 py-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 MangaWeb. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
