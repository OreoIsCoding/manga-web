import React, { useState } from 'react';
import { fetchAllManga } from '../controller/manga.js';
import MangaList from './MangaList';

function MangaSearch() {
  const [title, setTitle] = useState('');
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Fetch manga list filtered by title using the controller
      const resp = await fetchAllManga({ title });
      setMangas(resp || []);
    } catch (error) {
      setMangas([]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="flex items-center justify-center gap-4 mb-8">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Search for manga..."
          className="w-full max-w-lg px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      <div>
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {!loading && title && mangas.length > 0 && (
          <MangaList mangas={mangas} />
        )}
        {!loading && title && mangas.length === 0 && (
          <p className="text-center text-gray-600">No manga found matching "{title}"</p>
        )}
      </div>
    </div>
  );
}

export default MangaSearch;
