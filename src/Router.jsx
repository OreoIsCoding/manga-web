import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MangaSearchPage from './pages/MangaSearchPage';
import MangaDetailsPage from './pages/MangaDetailsPage';
import ChapterReaderPage from './pages/ChapterReaderPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import MangaReaderPage from './pages/MangaReaderPage';
import MangaRandomPage from './pages/MangaRandomPage';
import MangaPopularPage from './pages/MangaPopularPage';
import MangaLatestPage from './pages/MangaLatestPage';

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<MangaSearchPage />} />
          <Route path="/manga/:id" element={<MangaDetailsPage />} />
          <Route path="/manga/:mangaId/chapter/:chapterId" element={<ChapterReaderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/manga/:mangaId/read/:source" element={<MangaReaderPage />} />
          <Route path="/manga/random" element={<MangaRandomPage />} />
          <Route path="/manga/popular" element={<MangaPopularPage />} />
          <Route path="/manga/latest" element={<MangaLatestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
