import { useQuery } from '@tanstack/react-query';
import { adaptCharacter, CharacterApiItem } from '../../adapters/character-adapter';
import { axiosMarvel } from '../axios/axios-marvel';
import { Character } from '../../models/character';

// Hook personalizado para obtener personajes
export const useGetCharactersQuery = (searchText: string) => {
  const queryFn = async (search: string) => {
    let url = `/v1/public/characters?limit=50`;
    if (search) {
      url += `&nameStartsWith=${search}`;
    }
    const response = await axiosMarvel.get(url);
    return response.data.data.results?.map((result: CharacterApiItem) =>
      adaptCharacter({ characterData: result })
    );
  };

  const { data, isLoading, error } = useQuery<Character[]>({
    queryKey: ['get-characters', searchText],
    queryFn: () => queryFn(searchText),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error,
  };
};
