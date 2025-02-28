import { useQueries } from '@tanstack/react-query';
import { adaptCharacter } from '../../adapters/character-adapter';
import { axiosMarvel } from '../axios/axios-marvel';
import { adaptComic, ComicApiItem } from '../../adapters/comic-adapter';
import { useParams } from 'react-router-dom';
import { Character } from '../../models/character';
import { Comic } from '../../models/comic';

export const useGetCharacterDetailQuery = () => {
  const characterId = useParams()?.id;

  const queryDetailFn = async (): Promise<Character> => {
    const response = await axiosMarvel.get(`/v1/public/characters/${characterId}`);
    return adaptCharacter({ characterData: response.data.data.results[0] });
  };

  const queryComicFn = async (): Promise<Comic[]> => {
    const response = await axiosMarvel.get(
      `/v1/public/characters/${characterId}/comics?limit=20&orderBy=-onsaleDate`
    );
    return response.data.data.results?.map((result: ComicApiItem) => adaptComic(result));
  };

  const queries = useQueries({
    queries: [
      {
        queryKey: ['get-character-detail', characterId],
        queryFn: queryDetailFn,
      },
      {
        queryKey: ['get-character-comics', characterId],
        queryFn: queryComicFn,
      },
    ],
  });

  return {
    detail: queries[0].data,
    comics: queries[1].data,
    isLoading: queries.some((query) => query.isLoading),
    error: queries.some((query) => query.error),
  };
};
