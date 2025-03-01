import { renderHook, waitFor } from '@testing-library/react';
import { useFavouritesController } from '../use-favourites-controller';
import { searchFavorites } from '../../../../../../utils/indexedDB';

jest.mock('../../../../../../utils/indexedDB');

describe('useFavouritesController', () => {
  const mockedSearchFavorites = searchFavorites as jest.MockedFunction<typeof searchFavorites>;
  const mockFavourites = [
    { id: 1, name: 'Spider-Man', avatarUrl: 'path/to/spiderman.jpg', description: 'The amazing' },
  ];
  it('should fetch and set favourites on mount', async () => {
    mockedSearchFavorites.mockResolvedValue(mockFavourites);

    const { result } = renderHook(() => useFavouritesController());

    await waitFor(() => expect(result.current.favourites).toStrictEqual(mockFavourites));
  });

  it('should update favourites when search term changes', async () => {
    mockedSearchFavorites.mockResolvedValue(mockFavourites);

    const { result } = renderHook(() => useFavouritesController());

    await waitFor(() => result.current.setSearch('Spider'));

    await waitFor(() => {
      expect(mockedSearchFavorites).toHaveBeenCalledWith('Spider');
      expect(result.current.favourites).toEqual(mockFavourites);
    });
  });

  it('should add and remove event listener for favouritesUpdated', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useFavouritesController());

    expect(addEventListenerSpy).toHaveBeenCalledWith('favoritesUpdated', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('favoritesUpdated', expect.any(Function));
  });
});
