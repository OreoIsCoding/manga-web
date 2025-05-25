import React from 'react';
import { Link } from 'react-router-dom';

export default function SourceList({ sources, mangaId }) {
  if (!sources || Object.keys(sources).length === 0) {
    return (
      <div className="text-center p-4 bg-gray-700/50 rounded-lg">
        <p className="text-gray-400">No chapters available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(sources).map(([sourceName, data]) => (
        <Link
          key={sourceName}
          to={`/manga/${mangaId}/read/${encodeURIComponent(sourceName)}`}
          className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors group"
        >
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold text-gray-200 mb-2 group-hover:text-white">
              {sourceName}
            </h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-300">
              {data.totalChapters} Chapters Available
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
