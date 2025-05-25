import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChapterPages, getMangaChapters } from '../controller/manga';

function ChapterReaderPage() {
  const { mangaId, chapterId } = useParams();
  const [pages, setPages] = useState(null);
  const [volumeChapters, setVolumeChapters] = useState({});
  const [currentVolume, setCurrentVolume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readerSettings, setReaderSettings] = useState({
    darkMode: true,
    maxWidth: '900px',
    pageGap: '2rem'
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [mangaTitle, setMangaTitle] = useState('');
  const [showControls, setShowControls] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadChapterData = async () => {
      setLoading(true);
      try {
        const [pagesData, chaptersData] = await Promise.all([
          getChapterPages(chapterId),
          getMangaChapters(mangaId)
        ]);
        setPages(pagesData);
        
        // Get manga info and organize chapters
        const chapter = chaptersData.chapters.find(ch => ch.id === chapterId);
        setCurrentChapter(chapter); // Set current chapter
        setMangaTitle(chapter?.attributes?.title || '');
        
        // Get current chapter's source
        const group = chapter?.relationships.find(rel => rel.type === 'scanlation_group');
        const sourceName = group?.attributes?.name || 'Unknown Group';
        
        // Filter chapters by source and organize by volume
        const sourceChapters = chaptersData.chapters.filter(ch => {
          const chGroup = ch.relationships.find(rel => rel.type === 'scanlation_group');
          return (chGroup?.attributes?.name || 'Unknown Group') === sourceName;
        });

        // Group by volumes
        const volumes = sourceChapters.reduce((acc, chapter) => {
          const volNum = chapter.attributes.volume || 'no_volume';
          if (!acc[volNum]) {
            acc[volNum] = [];
          }
          acc[volNum].push(chapter);
          return acc;
        }, {});

        // Sort chapters within each volume
        Object.keys(volumes).forEach(volNum => {
          volumes[volNum].sort((a, b) => 
            parseFloat(a.attributes.chapter) - parseFloat(b.attributes.chapter)
          );
        });

        setVolumeChapters(volumes);
        const currentVol = chapter?.attributes.volume || 'no_volume';
        setCurrentVolume(currentVol);
      } catch (error) {
        console.error('Error loading chapter:', error);
      } finally {
        setLoading(false);
      }
    };
    loadChapterData();
  }, [mangaId, chapterId]);

  const handleChapterChange = (newChapterId) => {
    setCurrentPage(0);
    setShowSideMenu(false); // Close menu after selection
    navigate(`/manga/${mangaId}/chapter/${newChapterId}`);
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const handleVolumeChange = (newVolume) => {
    setCurrentVolume(newVolume);
    // Get first chapter of the new volume and navigate to it
    if (volumeChapters[newVolume]?.length > 0) {
      const firstChapter = volumeChapters[newVolume][0];
      handleChapterChange(firstChapter.id);
      setShowSideMenu(false); // Close menu after selection
    }
  };

  // Update useEffect to reset page on chapter change
  useEffect(() => {
    setCurrentPage(0);
    window.scrollTo(0, 0);
  }, [chapterId]);

  const currentIndex = volumeChapters[currentVolume]?.findIndex(ch => ch.id === chapterId);
  const prevChapter = currentIndex > 0 ? volumeChapters[currentVolume][currentIndex - 1] : null;
  const nextChapter = currentIndex < (volumeChapters[currentVolume]?.length - 1) ? volumeChapters[currentVolume][currentIndex + 1] : null;

  // Add keyboard navigation
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'ArrowLeft' && prevChapter) {
      handleChapterChange(prevChapter.id);
    } else if (event.key === 'ArrowRight' && nextChapter) {
      handleChapterChange(nextChapter.id);
    }
  }, [prevChapter, nextChapter]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Add swipe navigation for mobile
  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touch = e.changedTouches[0];
    const deltaX = touchStart.x - touch.clientX;
    const deltaY = touchStart.y - touch.clientY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50 && nextChapter) handleChapterChange(nextChapter.id);
      if (deltaX < -50 && prevChapter) handleChapterChange(prevChapter.id);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${readerSettings.darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Side Menu */}
      <div className={`fixed inset-y-0 left-0 w-80 bg-gray-800/95 backdrop-blur transform transition-transform duration-300 z-50 
        ${showSideMenu ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-4">
          {/* Menu Header */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate(`/manga/${mangaId}`)}
                className="text-gray-300 hover:text-blue-400 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Details
              </button>
              <button onClick={() => setShowSideMenu(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Title and Chapter Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-100 truncate">
                {mangaTitle || currentChapter?.attributes?.title || 'Loading...'}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Chapter {currentChapter?.attributes?.chapter}
              </p>
            </div>
          </div>

          {/* Volume Selection */}
          <div className="space-y-4 mb-6">
            <label className="block text-sm font-medium text-gray-400">Volume</label>
            <select
              value={currentVolume}
              onChange={(e) => handleVolumeChange(e.target.value)}
              className="w-full bg-gray-700 text-gray-200 rounded-lg px-3 py-2"
            >
              {Object.keys(volumeChapters).map((volNum) => (
                <option key={volNum} value={volNum}>
                  {volNum === 'no_volume' ? 'All Chapters' : `Volume ${volNum}`}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter List */}
          <div className="flex-1 overflow-y-auto">
            <label className="block text-sm font-medium text-gray-400 mb-2">Chapters</label>
            <div className="space-y-1">
              {currentVolume && volumeChapters[currentVolume]?.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handleChapterChange(ch.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors
                    ${ch.id === chapterId 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  Chapter {ch.attributes.chapter}
                </button>
              ))}
            </div>
          </div>

          {/* Reader Settings */}
          <div className="border-t border-gray-700 pt-4 mt-4">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Settings</h4>
            <div className="space-y-3">
              <button
                onClick={() => setReaderSettings(s => ({ ...s, darkMode: !s.darkMode }))}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gray-700 text-gray-200"
              >
                <span>Theme</span>
                <span>{readerSettings.darkMode ? '🌙 Dark' : '☀️ Light'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gray-800/95 backdrop-blur">
        <div className="flex items-center h-14 px-4">
          <button 
            onClick={() => setShowSideMenu(true)}
            className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-4 text-gray-200">Chapter {currentChapter?.attributes?.chapter}</div>
          <div className="ml-auto text-sm text-gray-400">
            {currentPage + 1} / {pages?.pages?.length || 0}
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <div className="flex-1 mt-14" onClick={() => setShowSideMenu(false)}>
        <div className="h-full flex items-center justify-center px-4">
          {pages?.pages?.length > 0 && (
            <div className="relative max-w-4xl mx-auto">
              <img
                src={`${pages.baseUrl}/data-saver/${pages.hash}/${pages.pages[currentPage]}`}
                alt={`Page ${currentPage + 1}`}
                className={`w-full h-auto object-contain mx-auto rounded-lg ${
                  readerSettings.darkMode ? '' : 'filter brightness-90'
                }`}
                loading="eager"
              />
              {/* Click Areas */}
              <div className="absolute inset-0 grid grid-cols-2">
                <div className="cursor-w-resize" onClick={(e) => {
                  e.stopPropagation();
                  if (currentPage > 0) setCurrentPage(p => p - 1);
                }} />
                <div className="cursor-e-resize" onClick={(e) => {
                  e.stopPropagation();
                  if (currentPage < pages.pages.length - 1) setCurrentPage(p => p + 1);
                }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChapterReaderPage;
