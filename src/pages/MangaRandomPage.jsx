import React, { useState, useEffect } from 'react';
import { fetchRandomManga } from '../controller/manga';
import MangaList from '../components/MangaList';
import { MangaCardSkeleton } from '../components/LoadingSkeleton';

function MangaRandomPage() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRandomManga();
  }, []);

  const loadRandomManga = async () => {
    setLoading(true);
    try {
      const data = await fetchRandomManga(20);
      setMangas(data);
    } catch (error) {
      console.error('Error loading random manga:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Random Manga</h1>
          <button
            onClick={loadRandomManga}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Shuffle
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(20)].map((_, idx) => (
              <MangaCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <MangaList mangas={mangas} />
        )}
      </div>
    </div>
  );
}

export default MangaRandomPage;
