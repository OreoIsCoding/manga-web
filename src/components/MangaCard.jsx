import React from 'react';
import { Link } from 'react-router-dom';

function MangaCard({ manga }) {
  const title =
    manga.attributes?.title?.en ||
    Object.values(manga.attributes?.title || {})[0] ||
    'Untitled';
  const author = manga.relationships?.find((rel) => rel.type === 'author')
    ?.attributes?.name;
  const tags = manga.attributes?.tags?.slice(0, 2) || [];

  const defaultCover = '/images/default-cover.png';

  return (
    <Link to={`/manga/${manga.id}`} className="group block h-full">
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 border border-gray-700/50">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={manga.coverUrl || defaultCover}
            alt={title}
            onError={(e) => {
              e.target.src = defaultCover;
            }}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {manga.attributes?.status && (
            <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-lg bg-gray-900/80 backdrop-blur-sm text-gray-100 border border-gray-700/50 capitalize">
              {manga.attributes.status}
            </span>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col relative z-10">
          <h3 className="font-semibold text-lg text-gray-100 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          {author && (
            <p className="text-sm text-gray-400/80 mt-1 font-medium">
              by {author}
            </p>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700/50 text-gray-300/90 border border-gray-600/50 backdrop-blur-sm"
                >
                  {tag.attributes?.name?.en}
                </span>
              ))}
            </div>
          )}
          <div className="mt-auto pt-3 flex items-center justify-between text-xs text-gray-400/80">
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4 opacity-70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Read Now
            </span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MangaCard;
