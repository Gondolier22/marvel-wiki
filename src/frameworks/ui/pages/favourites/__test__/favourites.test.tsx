import { render, screen } from '@testing-library/react';
import Favourites from '../favourites';
import { useFavouritesController } from '../hooks/use-favourites-controller';
import { vi } from 'vitest';
import { AppProviderMock } from '../../../mocks/app-provider-mock';

vi.mock('../hooks/use-favourites-controller');

describe('Favourites', () => {
  it('should render the searcher and character card list', () => {
    const mockUseFavouritesController = useFavouritesController as vi.MockedFunction<
      typeof useFavouritesController
    >;
    mockUseFavouritesController.mockReturnValue({
      favourites: [],
      search: '',
      setSearch: vi.fn(),
    });

    render(
      <AppProviderMock>
        <Favourites />
      </AppProviderMock>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/0 results/i)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should display the correct number of favourite characters', () => {
    const mockUseFavouritesController = useFavouritesController as vi.MockedFunction<
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
      setSearch: vi.fn(),
    });

    render(
      <AppProviderMock>
        <Favourites />
      </AppProviderMock>
    );

    expect(screen.getByText(/1 results/i)).toBeInTheDocument();
    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
  });
});
