import { render, fireEvent, waitFor } from '@testing-library/react';
import { FavButton } from '../fav-button';
import { addFavorite, removeFavorite } from '../../../../utils/indexedDB';

jest.mock('../../../../utils/indexedDB', () => ({
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
  openDB: jest.fn().mockResolvedValue({
    transaction: jest.fn().mockReturnValue({
      objectStore: jest.fn().mockReturnValue({
        get: jest.fn().mockImplementation(() => ({
          onsuccess: jest.fn(),
        })),
      }),
    }),
  }),
}));

describe('FavButton', () => {
  const character = { id: 1, name: 'Spider-Man', avatarUrl: 'spiderman.jpg' };

  it('should render without crashing', () => {
    render(<FavButton character={character} />);
  });

  it('should toggle favorite status on click', async () => {
    const { getByRole } = render(<FavButton character={character} />);
    const button = getByRole('button');

    fireEvent.click(button);
    await waitFor(() => expect(addFavorite).toHaveBeenCalledWith(character));
    fireEvent.click(button);
    await waitFor(() => expect(removeFavorite).toHaveBeenCalledWith(character.id));
  });

  it('should have the correct class when favorited', async () => {
    const { getByRole } = render(<FavButton character={character} />);
    const button = getByRole('button');

    fireEvent.click(button);
    await waitFor(() => expect(button).toHaveClass('c-fav-button--is-fav'));
    fireEvent.click(button);
    await waitFor(() => expect(button).not.toHaveClass('c-fav-button--is-fav'));
  });
});
