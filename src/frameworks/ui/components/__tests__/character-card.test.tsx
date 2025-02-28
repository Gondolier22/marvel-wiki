import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CharacterCard } from '../character-card';
import { Character } from '../../../../models/character';

const character: Character = {
  id: 1,
  name: 'Spider-Man',
  avatarUrl: 'https://example.com/spiderman.jpg',
  description: 'A description of Spider-Man',
  // ...other properties if any...
};

describe('CharacterCard', () => {
  it('renders character name and image', () => {
    render(
      <BrowserRouter>
        <CharacterCard {...character} />
      </BrowserRouter>
    );

    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar of Spider-Man')).toBeInTheDocument();
  });
});
