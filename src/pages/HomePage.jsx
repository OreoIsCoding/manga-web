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
            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                to="/manga/random"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-400/30 to-blue-500/30 hover:from-blue-400/50 hover:to-blue-500/50 text-white/90 text-center font-bold py-5 px-6 rounded-xl transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/10 hover:border-white/20 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform">
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                  </svg>
                  Random
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-white" />
              </Link>
              <Link 
                to="/manga/popular"
                className="group relative overflow-hidden bg-gradient-to-r from-violet-400/30 to-violet-500/30 hover:from-violet-400/50 hover:to-violet-500/50 text-white/90 text-center font-bold py-5 px-6 rounded-xl transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/10 hover:border-white/20 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform">
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  Popular
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-white" />
              </Link>
              <Link 
                to="/manga/latest"
                className="group relative overflow-hidden bg-gradient-to-r from-teal-400/30 to-teal-500/30 hover:from-teal-400/50 hover:to-teal-500/50 text-white/90 text-center font-bold py-5 px-6 rounded-xl transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/10 hover:border-white/20 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform">
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Latest
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-white" />
              </Link>
              <Link 
                to="/search"
                className="group relative overflow-hidden bg-gradient-to-r from-rose-400/30 to-rose-500/30 hover:from-rose-400/50 hover:to-rose-500/50 text-white/90 text-center font-bold py-5 px-6 rounded-xl transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/10 hover:border-white/20 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform">
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  Browse All
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-white" />
              </Link>
            </div>
          </div>

          {/* Featured Manga Card */}
          {featuredManga && (
            <div className="hidden md:block">
              <div className="bg-gray-800/80 backdrop-blur p-8 rounded-2xl border border-gray-700/50 shadow-xl transform hover:scale-[1.02] transition-transform duration-300 hover:border-gray-600/50">
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
