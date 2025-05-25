import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMangaDetails, getMangaChapters } from '../controller/manga';
import { MangaDetailsSkeleton } from '../components/LoadingSkeleton';
import VolumeList from '../components/VolumeList';
import ChapterList from '../components/ChapterList';
import SourceList from '../components/SourceList'; // Fix import to use default export

function MangaDetailsPage() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const [mangaData, chaptersData] = await Promise.all([
          getMangaDetails(id),
          getMangaChapters(id)
        ]);
        setManga(mangaData);
        setChapters(chaptersData);
      } catch (error) {
        console.error('Error fetching manga details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <MangaDetailsSkeleton />
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="text-center py-20 text-gray-400">
        <h1 className="text-2xl">Manga not found</h1>
      </div>
    );
  }

  const title = manga.attributes.title.en || Object.values(manga.attributes.title)[0];
  const description = manga.attributes.description?.en || '';

  // Parse official sources from description
  const officialSources = [];
  try {
    const officialSourcesMatch = description.match(/Alternative Official English - (.*?)\(U\.S\. Only\)/s);
    
    if (officialSourcesMatch) {
      const sourcesText = officialSourcesMatch[1];
      const matches = sourcesText.matchAll(/\[(.*?)\]\((.*?)\)/g);
      for (const match of matches) {
        officialSources.push({
          name: match[1],
          url: match[2]
        });
      }
    }
  } catch (error) {
    console.error('Error parsing official sources:', error);
  }

  const formatDescription = (desc = '') => {
    // Split description into parts
    const parts = desc.split('---');
    const mainDesc = parts[0];
    
    // Format awards and links separately
    const awards = desc.match(/\*\*(Won.*?)\*\*/g) || [];
    const formattedAwards = awards.map(award => award.replace(/\*\*/g, ''));

    return {
      mainDesc: mainDesc.trim(),
      awards: formattedAwards
    };
  };

  const { mainDesc, awards } = formatDescription(manga.attributes.description.en);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link 
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cover Image */}
          <div className="md:col-span-1">
            <img 
              src={`https://uploads.mangadex.org/covers/${id}/${manga.coverFileName}`}
              alt={title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Manga Info */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-gray-100 mb-4">{title}</h1>
            
            {/* Main Description */}
            <div className="prose prose-invert max-w-none space-y-4">
              {mainDesc.split('\n\n').map((paragraph, idx) => (
                paragraph.trim() && (
                  <p key={idx} className="text-gray-300">{paragraph.trim()}</p>
                )
              ))}
            </div>

            {/* Awards */}
            {awards.length > 0 && (
              <div className="mt-6 space-y-2">
                <h3 className="text-lg font-semibold text-gray-200">Awards</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {awards.map((award, idx) => (
                    <li key={idx}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Reading Options */}
            <div className="mt-8 space-y-8">
              {/* Official Sources */}
              {officialSources.length > 0 && (
                <div className="border-t border-gray-700 pt-8">
                  <h2 className="text-xl font-bold text-gray-100 mb-4">Official Sources (U.S. Only)</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {officialSources.map((source, index) => (
                      <a
                        key={index}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <span className="text-gray-200 font-medium">{source.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* MangaDex Chapters */}
              <div className="border-t border-gray-700 pt-8">
                <h2 className="text-xl font-bold text-gray-100 mb-4">Available Sources</h2>
                <SourceList sources={chapters.sources} mangaId={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MangaDetailsPage;
