import { renderHook, waitFor } from '@testing-library/react';
import { useCharacterListController } from '../use-characters-list-controller';
import { useGetCharactersQuery } from '../../../../../tanstack-query/use-get-characters';
import { adaptCharacter } from '../../../../../../adapters/character-adapter';

jest.mock('../../../../../tanstack-query/use-get-characters');

describe('useCharacterListController', () => {
  const mockData = [{ id: 1, name: 'Spider-Man', thumbnail: { path: '', extension: '' } }];
  const resultMockData = mockData.map((item) => adaptCharacter({ characterData: item }));
  const useGetCharactersQueryMock = useGetCharactersQuery as jest.MockedFunction<
    typeof useGetCharactersQuery
  >;
  it('should initialize with correct default values', () => {
    useGetCharactersQueryMock.mockReturnValue({ data: undefined, error: null, isLoading: false });

    const { result } = renderHook(() => useCharacterListController());

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.searchText).toBe('');
  });

  it('should call useGetCharactersQuery with searchText', () => {
    useGetCharactersQueryMock.mockReturnValue({ data: undefined, error: null, isLoading: false });

    renderHook(() => useCharacterListController());

    expect(useGetCharactersQuery).toHaveBeenCalledWith({ offset: 0, searchText: '' });
  });

  it('should return data, error, and isLoading from useGetCharactersQuery', () => {
    const mockError = null;
    const mockIsLoading = false;

    useGetCharactersQueryMock.mockReturnValue({
      data: { characters: resultMockData, totalItems: 100 },
      error: mockError,
      isLoading: mockIsLoading,
    });

    const { result } = renderHook(() => useCharacterListController());

    expect(result.current.data).toStrictEqual(resultMockData);
    expect(result.current.totalItems).toBe(100);
    expect(result.current.error).toBe(mockError);
    expect(result.current.isLoading).toBe(mockIsLoading);
  });

  it('should call useGetCharactersQuery with searchText', async () => {
    useGetCharactersQueryMock.mockReturnValue({
      data: { characters: resultMockData, totalItems: 100 },
      error: null,
      isLoading: false,
    });

    const { result, rerender } = renderHook(() => useCharacterListController());
    result.current.onNextPage();
    rerender();
    await waitFor(() => {
      expect(result.current.isPrevPageDisabled).toBeFalsy();
    });
    result.current.onPrevPage();
    rerender();
    await waitFor(() => {
      expect(result.current.isPrevPageDisabled).toBeTruthy();
    });
  });
});
