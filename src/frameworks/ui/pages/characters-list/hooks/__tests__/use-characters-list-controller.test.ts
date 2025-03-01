import { renderHook } from '@testing-library/react';
import { useCharacterListController } from '../use-characters-list-controller';
import { useGetCharactersQuery } from '../../../../../tanstack-query/use-get-characters';
import { adaptCharacter } from '../../../../../../adapters/character-adapter';

jest.mock('../../../../../tanstack-query/use-get-characters');

describe('useCharacterListController', () => {
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

    expect(useGetCharactersQuery).toHaveBeenCalledWith('');
  });

  it('should return data, error, and isLoading from useGetCharactersQuery', () => {
    const mockData = [{ id: 1, name: 'Spider-Man', thumbnail: { path: '', extension: '' } }];
    const resultMockData = mockData.map((item) => adaptCharacter({ characterData: item }));
    const mockError = null;
    const mockIsLoading = false;

    useGetCharactersQueryMock.mockReturnValue({
      data: resultMockData,
      error: mockError,
      isLoading: mockIsLoading,
    });

    const { result } = renderHook(() => useCharacterListController());

    expect(result.current.data).toStrictEqual(resultMockData);
    expect(result.current.error).toBe(mockError);
    expect(result.current.isLoading).toBe(mockIsLoading);
  });
});
