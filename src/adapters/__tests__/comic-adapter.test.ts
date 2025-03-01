import { adaptComic, ComicApiItem } from '../comic-adapter';
import { Comic } from '../../models/comic';

describe('adaptComic', () => {
  it('should adapt comic data correctly', () => {
    const comicData: ComicApiItem = {
      id: 1,
      title: 'Amazing Spider-Man',
      images: [{ path: 'path/to/spiderman', extension: 'jpg' }],
      dates: [{ type: 'onsaleDate', date: '2022-01-01T00:00:00Z' }],
    };

    const expectedComic: Comic = {
      id: 1,
      imageUrl: 'path/to/spiderman.jpg',
      title: 'Amazing Spider-Man',
      year: 2022,
    };

    expect(adaptComic(comicData)).toEqual(expectedComic);
  });

  it('should use default imageUrl if images are not provided', () => {
    const comicData: ComicApiItem = {
      id: 2,
      title: 'Iron Man',
      images: [],
      dates: [{ type: 'onsaleDate', date: '2022-01-01T00:00:00Z' }],
    };

    const expectedComic: Comic = {
      id: 2,
      imageUrl: '/image_not_found.svg',
      title: 'Iron Man',
      year: 2022,
    };

    expect(adaptComic(comicData)).toEqual(expectedComic);
  });

  it('should use default year if onsaleDate is not provided', () => {
    const comicData: ComicApiItem = {
      id: 3,
      title: 'Hulk',
      images: [{ path: 'path/to/hulk', extension: 'png' }],
      dates: [],
    };

    const expectedComic: Comic = {
      id: 3,
      imageUrl: 'path/to/hulk.png',
      title: 'Hulk',
      year: NaN, // Default year when no onsaleDate is provided
    };

    expect(adaptComic(comicData)).toEqual(expectedComic);
  });
});
