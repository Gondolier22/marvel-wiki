import { QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { HashRouter } from 'react-router-dom';
import { queryClient } from '../src/frameworks/tanstack-query/query-client';

export const AppProviderMock: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>{children}</HashRouter>
    </QueryClientProvider>
  );
};
