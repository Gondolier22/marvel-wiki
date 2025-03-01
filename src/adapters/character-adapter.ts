// Importa el modelo Character
import { Character } from '../models/character';

// Define el tipo CharacterApiItem que representa la estructura de los datos de la API
export type CharacterApiItem = {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
  description?: string;
};

// Función que adapta los datos de la API al modelo Character
export const adaptCharacter = ({
  characterData,
}: {
  characterData: CharacterApiItem;
}): Character => ({
  // Asigna el id del personaje
  id: characterData.id,
  // Asigna el nombre del personaje
  name: characterData.name,
  // Asigna la descripción del personaje, o una descripción por defecto si no está disponible
  description: characterData.description ? characterData.description : 'No description available',
  // Asigna la URL del avatar del personaje, o una imagen por defecto si no hay imágenes disponibles
  avatarUrl:
    characterData.thumbnail && characterData.thumbnail.path && characterData.thumbnail.extension
      ? `${characterData.thumbnail?.path}.${characterData.thumbnail?.extension}`
      : '/image_not_found.svg',
});
