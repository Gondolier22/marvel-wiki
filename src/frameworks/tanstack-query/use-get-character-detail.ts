import { useQueries } from "@tanstack/react-query";
import { adaptCharacter } from "../../adapters/character-adapter";
import { axiosMarvel } from "../axios/axios-marvel";
import { adaptComic, ComicApiItem } from "../../adapters/comic-adapter";

export const useGetCharacterDetailQuery = (characterId: number) => {
  const queryDetailFn = async () => {
    const response = await axiosMarvel.get(
      `/v1/public/characters/${characterId}`
    );
    return adaptCharacter({ characterData: response.data.data.results[0] });
  };

  const queryComicFn = async () => {
    const response = await axiosMarvel.get(
      `/v1/public/characters/${characterId}/comics`
    );
    return response.data.data.results?.map((result: ComicApiItem) =>
      adaptComic(result)
    );
  };

  const queries = useQueries({
    queries: [
      {
        queryKey: ["get-character-detail", characterId],
        queryFn: queryDetailFn,
      },
      {
        queryKey: ["get-character-comics", characterId],
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
