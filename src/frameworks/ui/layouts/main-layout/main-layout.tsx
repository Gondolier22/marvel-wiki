import { Outlet } from 'react-router-dom';
import { Header } from './components/header';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
