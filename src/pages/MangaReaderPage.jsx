import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMangaChapters } from '../controller/manga';

function MangaReaderPage() {
  const { mangaId, source } = useParams();
  const [volumes, setVolumes] = useState({});
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const chaptersData = await getMangaChapters(mangaId);
        const decodedSource = decodeURIComponent(source);
        
        if (!chaptersData.sources || !chaptersData.sources[decodedSource]) {
          throw new Error(`No chapters found for source: ${decodedSource}`);
        }

        const sourceVolumes = chaptersData.sources[decodedSource].volumes || {};
        setVolumes(sourceVolumes);
        
        // Set first volume as selected
        const firstVolume = Object.keys(sourceVolumes)[0];
        setSelectedVolume(firstVolume);
      } catch (error) {
        console.error('Error loading chapters:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [mangaId, source]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading chapters...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link to={`/manga/${mangaId}`} className="text-blue-400 hover:text-blue-300">
            ← Back to Manga Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-100">{decodeURIComponent(source)}</h2>
          <Link to={`/manga/${mangaId}`} className="text-blue-400 hover:text-blue-300">
            ← Back to Details
          </Link>
        </div>

        {/* Volume Selection */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(volumes).filter(([_, data]) => data.length > 0).map(([volNum, _]) => (
            <button
              key={volNum}
              onClick={() => setSelectedVolume(volNum)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedVolume === volNum
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {volNum === 'no_volume' ? 'No Volume' : `Volume ${volNum}`}
            </button>
          ))}
        </div>

        {/* Chapter List */}
        {selectedVolume && volumes[selectedVolume] && (
          <div className="grid gap-2">
            {volumes[selectedVolume]
              .sort((a, b) => parseFloat(a.attributes.chapter) - parseFloat(b.attributes.chapter))
              .map(chapter => (
                <Link
                  key={chapter.id}
                  to={`/manga/${mangaId}/chapter/${chapter.id}`}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <p className="text-gray-200">
                    Chapter {chapter.attributes.chapter}: {chapter.attributes.title || `Chapter ${chapter.attributes.chapter}`}
                  </p>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MangaReaderPage;
