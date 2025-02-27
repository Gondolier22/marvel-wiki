import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/main-layout/main-layout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route Component={MainLayout}>
        {/* <Route path="/" element={<CharacterList />} />
        <Route path="/favs" element={<Favs />} /> */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};
