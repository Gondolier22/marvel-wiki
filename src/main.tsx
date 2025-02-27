import { createRoot } from 'react-dom/client';
import { AppProvider } from './frameworks/ui/providers/app-provider.tsx';
import { AppRoutes } from './frameworks/ui/routes.tsx';
import './frameworks/ui/styles/styles.css';
createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <AppRoutes />
  </AppProvider>
);
