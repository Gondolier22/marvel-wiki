import { useGetCharacterDetailQuery } from '../use-get-character-detail';
import { axiosMarvel } from '../../axios/axios-marvel';
import { renderHook, waitFor } from '@testing-library/react';
import { AppProviderMock } from '../../ui/mocks/app-provider-mock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '123' }),
}));

describe('useGetCharacterDetailQuery', () => {
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
                  thumbnail: {
                    path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/b0/4bc61dec7755f',
                    extension: 'jpg',
                  },
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
      if (url.includes('/v1/public/characters/123')) {
        return Promise.resolve({
          data: {
            data: {
              results: [{ id: '123', name: 'Spider-Man' }],
            },
          },
        });
      }
    });

    const { result } = renderHook(() => useGetCharacterDetailQuery(), { wrapper: AppProviderMock });

    await waitFor(() => {
      expect(result.current.detail).toEqual({
        id: '123',
        name: 'Spider-Man',
        avatarUrl: '/image_not_found.svg',
        description: 'No description available',
      });
      expect(result.current.comics).toEqual([
        {
          id: 2539,
          title: 'X-MEN: THE COMPLETE AGE OF APOCALYPSE EPIC (Trade Paperback)',
          year: 2005,
          imageUrl: 'http://i.annihil.us/u/prod/marvel/i/mg/c/b0/4bc61dec7755f.jpg',
        },
      ]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(false);
    });
  });
});
