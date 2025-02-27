import { useQuery } from "@tanstack/react-query";
import {
  adaptCharacter,
  CharacterApiItem,
} from "../../adapters/character-adapter";
import { axiosMarvel } from "../axios/axios-marvel";

export const useGetCharactersQuery = () => {
  const queryFn = async () => {
    const response = await axiosMarvel.get("/v1/public/characters?limit=50");
    return response.data.data.results?.map((result: CharacterApiItem) =>
      adaptCharacter({ characterData: result })
    );
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-characters"],
    queryFn,
  });

  return {
    data,
    isLoading,
    error,
  };
};
