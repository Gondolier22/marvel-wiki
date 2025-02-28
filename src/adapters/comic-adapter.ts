import { Comic } from '../models/comic';

export type ComicApiItem = {
  id: number;
  title: string;
  images: { path: string; extension: string }[];
  dates: { type: string; date: string }[];
};

export const adaptComic = (data: ComicApiItem): Comic => ({
  id: data.id,
  imageUrl: `${data.images[0]?.path}.${data.images[0]?.extension}`,
  title: data.title,
  year: new Date(data.dates.find((date) => date.type === 'onsaleDate')?.date ?? '').getFullYear(),
});
