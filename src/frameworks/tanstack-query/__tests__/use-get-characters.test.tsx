import { axiosMarvel } from '../../axios/axios-marvel';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetCharactersQuery } from '../use-get-characters';
import { AppProviderMock } from '../../../../mocks/app-provider-mock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '123' }),
}));

describe('useGetCharactersQuery', () => {
  it('should return character detail and comics data', async () => {
    (axiosMarvel.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/v1/public/characters/123/comics')) {
        return Promise.resolve({
          data: {
            data: {
              results: [
                {
                  id: 2539,
                  title: 'X-MEN: THE COMPLETE AGE OF APOCALYPSE EPIC (Trade Paperback)',
                  dates: [
                    {
                      type: 'onsaleDate',
                      date: '2005-10-05T00:00:00-0400',
                    },
                  ],

                  images: [
                    {
                      path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/b0/4bc61dec7755f',
                      extension: 'jpg',
                    },
                  ],
                },
              ],
            },
          },
        });
      }
      if (url.includes('/v1/public/characters')) {
        return Promise.resolve({
          data: {
            data: {
              results: [
                {
                  id: 123,
                  name: 'Spider-Man',
                  thumbnail: {
                    path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/b0/4bc61dec7755f',
                    extension: 'jpg',
                  },
                  description: 'Spider-man description',
                },
              ],
            },
          },
        });
      }
    });

    const { result } = renderHook(() => useGetCharactersQuery('ab'), { wrapper: AppProviderMock });

    await waitFor(() => {
      expect(result.current.data).toStrictEqual([
        {
          id: 123,
          name: 'Spider-Man',
          avatarUrl: 'http://i.annihil.us/u/prod/marvel/i/mg/c/b0/4bc61dec7755f.jpg',
          description: 'Spider-man description',
        },
      ]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });
});
