import React, { useState, useEffect } from 'react';
import { fetchLatestManga } from '../controller/manga';
import MangaList from '../components/MangaList';
import { MangaCardSkeleton } from '../components/LoadingSkeleton';

function MangaLatestPage() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLatestManga = async () => {
      setLoading(true);
      try {
        const data = await fetchLatestManga();
        setMangas(data);
      } catch (error) {
        console.error('Error loading latest manga:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLatestManga();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-100 mb-8">Latest Updates</h1>

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

export default MangaLatestPage;
