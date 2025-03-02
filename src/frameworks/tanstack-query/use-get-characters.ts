import { useQuery } from '@tanstack/react-query';
import { adaptCharacter, CharacterApiItem } from '../../adapters/character-adapter';
import { axiosMarvel } from '../axios/axios-marvel';
import { Character } from '../../models/character';

type UseGetCharactersQueryParams = { searchText?: string; offset?: number };

type UseGetCharactersQueryResult = {
  characters?: Character[];
  totalItems: number;
};
// Hook personalizado para obtener personajes
export const useGetCharactersQuery = ({ offset = 0, searchText }: UseGetCharactersQueryParams) => {
  const queryFn = async ({ offset, searchText }: UseGetCharactersQueryParams) => {
    let url = `/v1/public/characters?limit=50&offset=${offset}`;
    if (searchText) {
      url += `&nameStartsWith=${searchText}`;
    }
    const response = await axiosMarvel.get(url);

    return {
      characters: response.data.data.results?.map((result: CharacterApiItem) =>
        adaptCharacter({ characterData: result })
      ),
      totalItems: response.data.data?.total,
    };
  };

  const { data, isLoading, error } = useQuery<UseGetCharactersQueryResult>({
    queryKey: ['get-characters', searchText, offset],
    queryFn: () => queryFn({ offset, searchText }),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error,
  };
};
