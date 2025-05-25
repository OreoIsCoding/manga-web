import React, { useEffect, useState } from 'react';
import { fetchCovers } from '../controller/manga.js';
import MangaCard from './MangaCard';

function MangaList({ mangas }) {
  const [covers, setCovers] = useState({});

  useEffect(() => {
    // Fetch covers for all manga in the list
    const fetchAllCovers = async () => {
      if (!mangas || mangas.length === 0) return;
      const mangaIds = mangas.map(m => m.id);

      const data = await fetchCovers({ manga: mangaIds, limit: 100 });
      // Map covers by mangaId, pick the first cover found for each manga
      const coverMap = {};
      data.forEach(cover => {
        // Find the manga id this cover belongs to
        const mangaRel = cover.relationships.find(r => r.type === 'manga');
        if (mangaRel) {
          // If there are multiple covers for a manga, pick the first one (or you can implement logic to pick by locale/volume)
          if (!coverMap[mangaRel.id]) {
            coverMap[mangaRel.id] = cover;
          }
        }
      });
      setCovers(coverMap);
    };
    fetchAllCovers();
  }, [mangas]);

  if (!mangas || mangas.length === 0) {
    return <p className="text-gray-500">No manga found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {mangas.map((manga) => {
        // Find the cover for this manga by manga.id
        const cover = covers[manga.id];
        return (
          <MangaCard
            key={manga.id}
            manga={manga}
            cover={cover}
          />
        );
      })}
    </div>
  );
}

export default MangaList;
