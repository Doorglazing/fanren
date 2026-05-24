import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import ArtifactsPage from './pages/ArtifactsPage';
import CharactersPage from './pages/CharactersPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import TianjiPage from './pages/TianjiPage';
import StarChartPage from './pages/StarChartPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/artifacts" element={<ArtifactsPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterDetailPage />} />
        <Route path="/tianji" element={<TianjiPage />} />
      </Route>
      <Route path="/starchart" element={<StarChartPage />} />
    </Routes>
  );
}
