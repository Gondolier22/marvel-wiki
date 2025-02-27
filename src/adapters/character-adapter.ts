import { Character } from "../models/character";
import { adaptComic, ComicApiItem } from "./comic-adapter";

export type CharacterApiItem = {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
  description?: string;
};

export const adaptCharacter = ({
  characterData,
  comicsData,
}: {
  characterData: CharacterApiItem;
  comicsData?: ComicApiItem[];
}): Character => ({
  id: characterData.id,
  name: characterData.name,
  description: characterData.description ?? "",
  avatarUrl: `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`,
  comics: comicsData?.map((comic) => adaptComic(comic)) ?? [],
});
