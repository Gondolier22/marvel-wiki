import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/main-layout/main-layout';
import { lazy } from 'react';

const CharactersList = lazy(
  () => import('./pages/characters-list/characters-list')
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route Component={MainLayout}>
        <Route path="/" Component={CharactersList} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};
