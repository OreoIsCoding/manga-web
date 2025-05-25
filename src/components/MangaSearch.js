import React, { useState } from 'react';
import { fetchMangaIdsByTitle } from '../controller/manga.js';

function MangaSearch() {
  const [title, setTitle] = useState('');
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await fetchMangaIdsByTitle(title);
      setIds(result);
    } catch (err) {
      setError('Failed to fetch manga.');
      setIds([]);
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter manga title"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div>
        {!loading && ids.length > 0 && (
          <ul className="list-disc pl-5 space-y-1">
            {ids.map(id => <li key={id} className="break-all">{id}</li>)}
          </ul>
        )}
        {!loading && ids.length === 0 && !error && (
          <p className="text-gray-500">No results</p>
        )}
      </div>
    </div>
  );
}

export default MangaSearch;
