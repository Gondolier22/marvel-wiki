import { Comic } from "../models/comic";

export type ComicApiItem = {
  title: string;
  thumbnail: { path: string; extension: string };
  dates: { type: string; date: string }[];
};

export const adaptComic = (data: ComicApiItem): Comic => ({
  title: data.title,
  year: new Date(
    data.dates.find((date) => date.type === "onsaleDate")?.date ?? ""
  ).getFullYear(),
});
