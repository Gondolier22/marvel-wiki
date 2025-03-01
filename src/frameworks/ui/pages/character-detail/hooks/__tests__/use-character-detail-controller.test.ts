import { renderHook } from '@testing-library/react';
import { useCharacterDetailController } from '../use-character-detail-controller';
import { useGetCharacterDetailQuery } from '../../../../../tanstack-query/use-get-character-detail';
import { adaptCharacter } from '../../../../../../adapters/character-adapter';
import { adaptComic } from '../../../../../../adapters/comic-adapter';

jest.mock('../../../../../tanstack-query/use-get-character-detail');

describe('useCharacterDetailController', () => {
  const useGetCharacterDetailQueryMock = useGetCharacterDetailQuery as jest.MockedFunction<
    typeof useGetCharacterDetailQuery
  >;
  it('should initialize with correct default values', () => {
    useGetCharacterDetailQueryMock.mockReturnValue({
      detail: undefined,
      comics: undefined,
      error: false,
      isLoading: false,
    });

    const { result } = renderHook(() => useCharacterDetailController());

    expect(result.current.detail).toBeUndefined();
    expect(result.current.comics).toBeUndefined();
    expect(result.current.error).toBeFalsy();
    expect(result.current.isLoading).toBe(false);
  });

  it('should return detail, comics, error, and isLoading from useGetCharacterDetailQuery', () => {
    const mockDetail = { id: 1, name: 'Spider-Man', thumbnail: { path: '', extension: '' } };
    const mockComics = [{ id: 1, title: 'Amazing Spider-Man', images: [], dates: [] }];
    const mockError = false;
    const mockIsLoading = false;

    useGetCharacterDetailQueryMock.mockReturnValue({
      detail: adaptCharacter({ characterData: mockDetail }),
      comics: mockComics.map((item) => adaptComic(item)),
      error: mockError,
      isLoading: mockIsLoading,
    });

    const { result } = renderHook(() => useCharacterDetailController());

    expect(result.current.detail).toStrictEqual(adaptCharacter({ characterData: mockDetail }));
    expect(result.current.comics).toStrictEqual(mockComics.map((item) => adaptComic(item)));
    expect(result.current.error).toBe(mockError);
    expect(result.current.isLoading).toBe(mockIsLoading);
  });
});
