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
  avatarUrl: `${characterData.thumbnail?.path}.${characterData.thumbnail?.extension}`,
});
