import React from 'react';
import { Link } from 'react-router-dom';

function ChapterList({ volumesByGroup = {}, mangaId }) {
  const groups = Object.keys(volumesByGroup || {});

  if (!volumesByGroup || groups.length === 0) {
    return (
      <div className="text-center p-4 bg-gray-700/50 rounded-lg">
        <p className="text-gray-400">No chapters available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map(groupName => (
        <Link
          key={groupName}
          to={`/manga/${mangaId}/read/${encodeURIComponent(groupName)}`}
          className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors group"
        >
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold text-gray-200 mb-2 group-hover:text-white">{groupName}</h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-300">
              {volumesByGroup[groupName].none.chapters.length} Chapters Available
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChapterList;
