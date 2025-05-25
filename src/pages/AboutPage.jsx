import React from 'react';

function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">MangaWeb</h2>
            <div className="inline-block px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
              Under Development
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-gray-300 text-center text-lg leading-relaxed">
              This project is currently in active development. New features and improvements are being added regularly.
            </p>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Developer</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                  P
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-100">Paul Axel Dionisio</h4>
                  <p className="text-gray-400">Developer</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-gray-700/20 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-gray-100 mb-2">Tech Stack</h3>
                <p className="text-gray-400">React, TailwindCSS, MangaDex API</p>
              </div>
              <div className="bg-gray-700/20 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-gray-100 mb-2">Status</h3>
                <p className="text-gray-400">Actively improving and adding features</p>
              </div>
            </div>

            <div className="text-center text-gray-400 mt-8 pt-8 border-t border-gray-700">
              <p>© 2025 MangaWeb by Paul Axel Dionisio. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
