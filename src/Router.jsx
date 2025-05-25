import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MangaSearchPage from './pages/MangaSearchPage';
import MangaDetailsPage from './pages/MangaDetailsPage';
import ChapterReaderPage from './pages/ChapterReaderPage';
import AboutPage from './pages/AboutPage';
import MangaReaderPage from './pages/MangaReaderPage';
import MangaRandomPage from './pages/MangaRandomPage';
import MangaPopularPage from './pages/MangaPopularPage';
import MangaLatestPage from './pages/MangaLatestPage';

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<MangaSearchPage />} />
          <Route path="/manga/:id" element={<MangaDetailsPage />} />
          <Route path="/manga/:mangaId/chapter/:chapterId" element={<ChapterReaderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/manga/:mangaId/read/:source" element={<MangaReaderPage />} />
          <Route path="/manga/random" element={<MangaRandomPage />} />
          <Route path="/manga/popular" element={<MangaPopularPage />} />
          <Route path="/manga/latest" element={<MangaLatestPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppRouter;
