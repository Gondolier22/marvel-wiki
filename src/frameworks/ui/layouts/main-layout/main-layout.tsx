import { Outlet } from 'react-router-dom';
import { Header } from './components/header';

// Componente de layout principal que incluye el header y el contenido principal
export const MainLayout = () => {
  return (
    <>
      {/* Componente del header */}
      <Header />
      <main>
        {/* Outlet para renderizar las rutas hijas */}
        <Outlet />
      </main>
    </>
  );
};
