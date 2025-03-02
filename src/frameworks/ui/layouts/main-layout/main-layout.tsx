import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import { ErrorBoundary } from 'react-error-boundary';
import { AlertMessage } from '../../components/alert-message';

// Componente de layout principal que incluye el header y el contenido principal
export const MainLayout = () => {
  return (
    <>
      {/* Componente del header */}
      <Header />
      <main>
        <ErrorBoundary
          fallback={
            <AlertMessage
              message="There was an unexpected error, please refresh the page and try again. If the error persists, please contact support."
              type="error"
            />
          }
        >
          {/* Outlet para renderizar las rutas hijas */}
          <Outlet />
        </ErrorBoundary>
      </main>
    </>
  );
};
