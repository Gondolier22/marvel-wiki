// Importa el modelo Comic
import { Comic } from '../models/comic';

// Define el tipo ComicApiItem que representa la estructura de los datos de la API
export type ComicApiItem = {
  id: number;
  title: string;
  images: { path: string; extension: string }[];
  dates: { type: string; date: string }[];
};

// Función que adapta los datos de la API al modelo Comic
export const adaptComic = (data: ComicApiItem): Comic => ({
  // Asigna el id del comic
  id: data.id,
  // Asigna la URL de la imagen del comic, o una imagen por defecto si no hay imágenes disponibles
  imageUrl:
    data.images.length > 0
      ? `${data.images[0]?.path}.${data.images[0]?.extension}`
      : '/image_not_found.svg',
  // Asigna el título del comic
  title: data.title,
  // Asigna el año de publicación del comic, obteniéndolo de la fecha de venta
  year: new Date(data.dates.find((date) => date.type === 'onsaleDate')?.date ?? '').getFullYear(),
});
