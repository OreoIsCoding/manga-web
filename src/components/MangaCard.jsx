import React from 'react';
import { Link } from 'react-router-dom';

function MangaCard({ manga, coverFileName }) {
  const title =
    manga.attributes?.title?.en ||
    Object.values(manga.attributes?.title || {})[0] ||
    'Untitled';

  const coverUrl = coverFileName
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}`
    : '/placeholder.png';

  return (
    <Link to={`/manga/${manga.id}`} className="group block h-full">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden h-full flex flex-col transition-transform hover:scale-[1.02] border border-gray-700">
        <div className="aspect-[3/4] relative">
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg text-gray-100 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          {manga.attributes?.status && (
            <span className="mt-auto inline-block px-2 py-1 text-xs rounded bg-gray-700 text-gray-300 capitalize">
              {manga.attributes.status}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default MangaCard;
