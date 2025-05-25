import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function VolumeList({ volumes, mangaId }) {
  const [activeVolume, setActiveVolume] = useState(Object.keys(volumes)[0]);

  return (
    <div className="space-y-4">
      {/* Volume Selection */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(volumes).map(([volNum, data]) => (
          <button
            key={volNum}
            onClick={() => setActiveVolume(volNum)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeVolume === volNum
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {data.volume}
          </button>
        ))}
      </div>

      {/* Chapter List */}
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-200">
          {volumes[activeVolume].volume} Chapters
        </h3>
        <div className="grid gap-2">
          {volumes[activeVolume].chapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/manga/${mangaId}/chapter/${chapter.id}`}
              className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-200">
                  Chapter {chapter.attributes.chapter}: {chapter.attributes.title || `Chapter ${chapter.attributes.chapter}`}
                </p>
                <span className="text-sm text-gray-400">
                  {chapter.relationships.find(rel => rel.type === 'scanlation_group')?.attributes?.name || 'Unknown Group'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VolumeList;
