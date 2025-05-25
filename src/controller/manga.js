import api from '../../public/axios/axios.js';

export async function fetchMangaIdsByTitle(title) {
  const resp = await api.get('/manga', {
    params: { title }
  });
  return resp.data.data.map(manga => manga.id);
}

// Fetch all manga (first page, limit 20)
export async function fetchAllManga() {
  const resp = await api.get('/manga', {
    params: { 
      limit: 20,
      includes: ['cover_art'],
      contentRating: ['safe', 'suggestive'],
      order: { followedCount: 'desc' },
      hasAvailableChapters: true
    }
  });
  return resp.data.data;
}

// Get manga details (including cover info) by mangaId
export async function getMangaCover(mangaId) {
  const response = await api.get(`/manga/${mangaId}`);
  return response.data.data;
}

// Get cover details by coverId
export async function getCover(coverId) {
  const response = await api.get(`/cover/${coverId}`);
  return response.data.data;
}

// Get a list of covers with optional parameters
export async function fetchCovers({ limit = 10, offset = 0, manga = [], ids = [], uploaders = [], locales = [], order = {}, includes = [] } = {}) {
  const params = {
    limit,
    offset,
  };
  if (manga.length) params['manga[]'] = manga;
  if (ids.length) params['ids[]'] = ids;
  if (uploaders.length) params['uploaders[]'] = uploaders;
  if (locales.length) params['locales[]'] = locales;
  if (includes.length) params['includes[]'] = includes;
  if (Object.keys(order).length) {
    Object.entries(order).forEach(([key, value]) => {
      params[`order[${key}]`] = value;
    });
  }

  const response = await api.get('/cover', { params });
  return response.data.data;
}

export async function searchManga(query) {
  try {
    const response = await fetch(`https://api.mangadex.org/manga?limit=20&title=${query}`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching manga:', error);
    return [];
  }
}

export async function getMangaDetails(mangaId) {
  try {
    const response = await api.get(`/manga/${mangaId}?includes[]=cover_art`);
    const manga = response.data.data;
    const coverRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
    manga.coverFileName = coverRelationship?.attributes?.fileName;
    return manga;
  } catch (error) {
    console.error('Error fetching manga details:', error);
    return null;
  }
}

export async function getMangaChapters(mangaId) {
  try {
    const response = await api.get(`/manga/${mangaId}/feed`, {
      params: {
        translatedLanguage: ['en'],
        order: { volume: 'asc', chapter: 'asc' },
        limit: 500,
        includes: ['scanlation_group']
      }
    });

    const allChapters = response.data.data;
    
    // Group by scanlation group with chapter number as key to prevent duplicates
    const sourceGroups = {};
    allChapters.forEach(chapter => {
      const group = chapter.relationships.find(rel => rel.type === 'scanlation_group');
      const groupName = group?.attributes?.name || 'Unknown Group';
      const chapterNum = chapter.attributes.chapter;
      
      if (!sourceGroups[groupName]) {
        sourceGroups[groupName] = {
          volumes: {},
          totalChapters: 0,
          chapterMap: new Map() // Use Map to store unique chapters
        };
      }

      // Only add chapter if we don't have this chapter number yet
      if (!sourceGroups[groupName].chapterMap.has(chapterNum)) {
        sourceGroups[groupName].chapterMap.set(chapterNum, chapter);
        sourceGroups[groupName].totalChapters++;
        
        const volume = chapter.attributes.volume || 'no_volume';
        if (!sourceGroups[groupName].volumes[volume]) {
          sourceGroups[groupName].volumes[volume] = [];
        }
        sourceGroups[groupName].volumes[volume].push(chapter);
      }
    });

    // Clean up and sort chapters in each volume
    Object.keys(sourceGroups).forEach(groupName => {
      Object.keys(sourceGroups[groupName].volumes).forEach(volume => {
        sourceGroups[groupName].volumes[volume].sort((a, b) => {
          return parseFloat(a.attributes.chapter || '0') - parseFloat(b.attributes.chapter || '0');
        });
      });
      delete sourceGroups[groupName].chapterMap; // Remove the temporary Map
    });

    return {
      sources: sourceGroups,
      chapters: allChapters
    };
  } catch (error) {
    console.error('Error fetching manga chapters:', error);
    return { sources: {}, chapters: [] };
  }
}

export async function getChapterPages(chapterId) {
  try {
    const response = await api.get(`/at-home/server/${chapterId}`);
    const { baseUrl, chapter } = response.data;
    return {
      baseUrl,
      hash: chapter.hash,
      dataSaver: chapter.dataSaver,
      pages: chapter.dataSaver
    };
  } catch (error) {
    console.error('Error fetching chapter:', error);
    return null;
  }
}

export async function fetchRandomManga(amount = 10) {
  try {
    // First get random manga IDs
    const randomResponse = await api.get('/manga/random', {
      params: {
        limit: amount,
        contentRating: ['safe', 'suggestive'],
      }
    });

    // Then fetch full details including covers for each manga
    const mangaIds = randomResponse.data.data.map(manga => manga.id);
    const detailsResponse = await api.get('/manga', {
      params: {
        ids: mangaIds,
        includes: ['cover_art'],
      }
    });

    return detailsResponse.data.data;
  } catch (error) {
    console.error('Error fetching random manga:', error);
    return [];
  }
}

export async function fetchPopularManga() {
  try {
    const response = await api.get('/manga', {
      params: {
        limit: 20,
        includes: ['cover_art'],
        contentRating: ['safe', 'suggestive'],
        order: { followedCount: 'desc' }
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching popular manga:', error);
    return [];
  }
}

export async function fetchLatestManga() {
  try {
    const response = await api.get('/manga', {
      params: {
        limit: 20,
        includes: ['cover_art'],
        contentRating: ['safe', 'suggestive'],
        order: { latestUploadedChapter: 'desc' }
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching latest manga:', error);
    return [];
  }
}