import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllManga } from '../controller/manga';
import MangaCard from '../components/MangaCard';
import { MangaCardSkeleton } from '../components/LoadingSkeleton';

function HomePage() {
  const [mangas, setMangas] = useState([]);
  const [featuredManga, setFeaturedManga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allManga = await fetchAllManga();
        // Set first manga as featured
        setFeaturedManga(allManga[0]);
        setMangas(allManga);
      } catch (error) {
        console.error('Error loading manga:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Update the manga slicing
  const popularManga = loading ? [] : mangas.slice(0, 5).map(manga => ({
    ...manga,
    coverFileName: manga.relationships?.find(rel => rel.type === 'cover_art')?.attributes?.fileName
  }));

  const latestManga = loading ? [] : mangas.slice(5, 10).map(manga => ({
    ...manga,
    coverFileName: manga.relationships?.find(rel => rel.type === 'cover_art')?.attributes?.fileName
  }));

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center">
        {/* Background Image with Overlay */}
        {featuredManga && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900" />
            <img
              src={`https://uploads.mangadex.org/covers/${featuredManga.id}/${featuredManga.relationships?.find(rel => rel.type === 'cover_art')?.attributes?.fileName}`}
              alt="Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Discover Amazing Manga
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Explore a vast collection of manga across different genres.
            </p>
            {/* Updated Navigation Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/manga/random"
                className="bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Random Manga
              </Link>
              <Link 
                to="/manga/popular"
                className="bg-gray-700 hover:bg-gray-600 text-white text-center font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Popular Now
              </Link>
              <Link 
                to="/manga/latest"
                className="bg-gray-700 hover:bg-gray-600 text-white text-center font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Latest Updates
              </Link>
              <Link 
                to="/search"
                className="bg-gray-700 hover:bg-gray-600 text-white text-center font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Browse All
              </Link>
            </div>
          </div>

          {/* Featured Manga Card */}
          {featuredManga && (
            <div className="hidden md:block">
              <div className="bg-gray-800/80 backdrop-blur p-6 rounded-2xl border border-gray-700 shadow-xl transform hover:scale-[1.02] transition-transform">
                <img
                  src={`https://uploads.mangadex.org/covers/${featuredManga.id}/${featuredManga.relationships?.find(rel => rel.type === 'cover_art')?.attributes?.fileName}`}
                  alt={featuredManga.attributes?.title?.en}
                  className="w-full h-96 object-cover rounded-lg shadow-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-100 mb-2">
                  Featured: {featuredManga.attributes?.title?.en}
                </h3>
                <Link 
                  to={`/manga/${featuredManga.id}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Read Now →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popular Manga Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-100">Popular Manga</h2>
          <Link to="/manga/popular" className="text-blue-400 hover:text-blue-300">
            View More →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {loading ? (
            [...Array(5)].map((_, idx) => (
              <MangaCardSkeleton key={idx} />
            ))
          ) : (
            popularManga.map(manga => (
              <MangaCard
                key={manga.id}
                manga={manga}
                coverFileName={manga.coverFileName}
              />
            ))
          )}
        </div>
      </div>

      {/* Latest Updates Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-800">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-100">Latest Updates</h2>
          <Link to="/manga/latest" className="text-blue-400 hover:text-blue-300">
            View More →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {loading ? (
            [...Array(5)].map((_, idx) => (
              <MangaCardSkeleton key={idx} />
            ))
          ) : (
            latestManga.map(manga => (
              <MangaCard
                key={manga.id}
                manga={manga}
                coverFileName={manga.coverFileName}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
