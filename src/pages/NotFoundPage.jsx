import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <div className="absolute -mt-20 text-center w-full">
          <p className="text-3xl font-bold mb-4">Page Not Found</p>
          <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
