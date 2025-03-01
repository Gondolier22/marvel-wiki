import { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cacheTime, queryClient } from '../../tanstack-query/query-client';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: cacheTime }}
    >
      <BrowserRouter>{children}</BrowserRouter>
    </PersistQueryClientProvider>
  );
};
