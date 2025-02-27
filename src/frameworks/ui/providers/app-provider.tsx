import { QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '../../tanstack-query/query-client';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};
