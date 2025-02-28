import { render, screen } from '@testing-library/react';
import Favourites from '../favourites';
import { useFavouritesController } from '../hooks/use-favourites-controller';
import { AppProviderMock } from '../../../mocks/app-provider-mock';

jest.mock('../hooks/use-favourites-controller');

describe('Favourites', () => {
  it('should render the searcher and character card list', () => {
    const mockUseFavouritesController = useFavouritesController as jest.MockedFunction<
      typeof useFavouritesController
    >;
    mockUseFavouritesController.mockReturnValue({
      favourites: [],
      search: '',
      setSearch: jest.fn(),
    });

    render(
      <AppProviderMock>
        <Favourites />
      </AppProviderMock>
    );

    expect(screen.getByRole('textbox')).toBeTruthy();
    expect(screen.getByText(/0 results/i)).toBeTruthy();
    expect(screen.getByRole('list')).toBeTruthy();
  });

  it('should display the correct number of favourite characters', () => {
    const mockUseFavouritesController = useFavouritesController as jest.MockedFunction<
      typeof useFavouritesController
    >;
    mockUseFavouritesController.mockReturnValue({
      favourites: [
        {
          id: 1,
          name: 'Spider-Man',
          avatarUrl: 'path/to/spiderman.jpg',
        },
      ],
      search: '',
      setSearch: jest.fn(),
    });

    render(
      <AppProviderMock>
        <Favourites />
      </AppProviderMock>
    );

    expect(screen.getByText(/1 results/i)).toBeTruthy();
    expect(screen.getByText('Spider-Man')).toBeTruthy();
  });
});
