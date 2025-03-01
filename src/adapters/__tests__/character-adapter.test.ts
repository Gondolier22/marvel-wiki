import { adaptCharacter, CharacterApiItem } from '../character-adapter';
import { Character } from '../../models/character';

describe('adaptCharacter', () => {
  it('should adapt character data correctly', () => {
    const characterData: CharacterApiItem = {
      id: 1,
      name: 'Spider-Man',
      thumbnail: { path: 'path/to/spiderman', extension: 'jpg' },
      description: 'A superhero in New York City',
    };

    const expectedCharacter: Character = {
      id: 1,
      name: 'Spider-Man',
      description: 'A superhero in New York City',
      avatarUrl: 'path/to/spiderman.jpg',
    };

    expect(adaptCharacter({ characterData })).toEqual(expectedCharacter);
  });

  it('should use default description if not provided', () => {
    const characterData: CharacterApiItem = {
      id: 2,
      name: 'Iron Man',
      thumbnail: { path: 'path/to/ironman', extension: 'png' },
    };

    const expectedCharacter: Character = {
      id: 2,
      name: 'Iron Man',
      description: 'No description available',
      avatarUrl: 'path/to/ironman.png',
    };

    expect(adaptCharacter({ characterData })).toEqual(expectedCharacter);
  });

  it('should use default avatarUrl if thumbnail is not provided', () => {
    const characterData: CharacterApiItem = {
      id: 3,
      name: 'Hulk',
      description: 'A green superhero',
      thumbnail: { path: '', extension: '' },
    };

    const expectedCharacter: Character = {
      id: 3,
      name: 'Hulk',
      description: 'A green superhero',
      avatarUrl: '/image_not_found.svg',
    };

    expect(adaptCharacter({ characterData })).toEqual(expectedCharacter);
  });
});
