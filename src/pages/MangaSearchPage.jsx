import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import MangaList from '../components/MangaList';
import { searchManga } from '../controller/manga';
import { MangaCardSkeleton } from '../components/LoadingSkeleton';

function MangaSearchPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const query = searchParams.get('query')?.trim() || '';
    const category = searchParams.get('category')?.trim() || '';
    
    // Only search if we have a non-empty query or category
    if (query || category) {
      handleSearch(query, category);
    }
  }, [searchParams]);

  const handleSearch = async (query, category) => {
    // Don't search if both query and category are empty
    if (!query && !category) {
      return;
    }

    setLoading(true);
    try {
      const data = await searchManga(query, category);
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-100 mb-6 text-center">Search Manga</h1>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Searching...</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...Array(10)].map((_, idx) => (
                <MangaCardSkeleton key={idx} />
              ))}
            </div>
          </div>
        ) : searched && (
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Search Results</h2>
            {results.length > 0 ? (
              <MangaList mangas={results} />
            ) : (
              <p className="text-center text-gray-400">No manga found. Try a different search term.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MangaSearchPage;
