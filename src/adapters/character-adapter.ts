import { Character } from '../models/character';

export type CharacterApiItem = {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
  description?: string;
};

export const adaptCharacter = ({
  characterData,
}: {
  characterData: CharacterApiItem;
}): Character => ({
  id: characterData.id,
  name: characterData.name,
  description: characterData.description ? characterData.description : 'No description available',
  avatarUrl:
    characterData.thumbnail && characterData.thumbnail.path && characterData.thumbnail.extension
      ? `${characterData.thumbnail?.path}.${characterData.thumbnail?.extension}`
      : '/image_not_found.svg',
});
