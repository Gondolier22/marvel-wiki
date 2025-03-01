import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { DefaultOptions, QueryClient } from '@tanstack/react-query';

export const cacheTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: cacheTime,
    gcTime: cacheTime,
  },
};

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});
