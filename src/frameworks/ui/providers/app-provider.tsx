import { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cacheTime, queryClient } from '../../tanstack-query/query-client';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ErrorBoundary } from 'react-error-boundary';
import { AlertMessage } from '../components/alert-message';

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: cacheTime }}
    >
      <ErrorBoundary
        fallback={
          <AlertMessage
            message="There was an unexpected error, please refresh the page and try again. If the error persists, please contact support."
            type="error"
          />
        }
      >
        <BrowserRouter>{children}</BrowserRouter>
      </ErrorBoundary>
    </PersistQueryClientProvider>
  );
};
