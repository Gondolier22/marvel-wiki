import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/main-layout/main-layout';
import { lazy, Suspense } from 'react';

const CharactersList = lazy(() => import('./pages/characters-list/characters-list'));

const CharacterDetail = lazy(() => import('./pages/character-detail/character-detail'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route Component={MainLayout}>
          <Route path="/" Component={CharactersList} />
          <Route path="/characters/:id" Component={CharacterDetail} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </Suspense>
  );
};
