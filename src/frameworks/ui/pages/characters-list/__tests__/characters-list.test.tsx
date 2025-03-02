import { render, screen } from '@testing-library/react';
import CharactersList from '../characters-list';
import { useCharacterListController } from '../hooks/use-characters-list-controller';
import { AppProviderMock } from '../../../../../../mocks/app-provider-mock';

jest.mock('../hooks/use-characters-list-controller');

describe('CharactersList', () => {
  it('should render the searcher and character card list', () => {
    const mockUseCharactersListController = useCharacterListController as jest.MockedFunction<
      typeof useCharacterListController
    >;
    mockUseCharactersListController.mockReturnValue({
      data: [],
      searchText: '',
      setSearchText: jest.fn(),
      isLoading: false,
      error: null,
    });

    render(
      <AppProviderMock>
        <CharactersList />
      </AppProviderMock>
    );

    expect(screen.getByRole('textbox')).toBeTruthy();
    expect(screen.getByText(/0 results/i)).toBeTruthy();
    expect(screen.getByRole('alert')).toBeTruthy();
  });

  it('should display the correct number of favourite characters', () => {
    const mockUseCharactersListController = useCharacterListController as jest.MockedFunction<
      typeof useCharacterListController
    >;
    mockUseCharactersListController.mockReturnValue({
      data: [
        {
          id: 1,
          name: 'Spider-Man',
          avatarUrl: 'path/to/spiderman.jpg',
          description: 'The amazing',
        },
      ],
      searchText: '',
      setSearchText: jest.fn(),
      isLoading: false,
      error: null,
    });

    render(
      <AppProviderMock>
        <CharactersList />
      </AppProviderMock>
    );

    expect(screen.getByText(/1 results/i)).toBeTruthy();
    expect(screen.getByText('Spider-Man')).toBeTruthy();
  });

  it('should display loader when is loading', () => {
    const mockUseCharactersListController = useCharacterListController as jest.MockedFunction<
      typeof useCharacterListController
    >;
    mockUseCharactersListController.mockReturnValue({
      data: [
        {
          id: 1,
          name: 'Spider-Man',
          avatarUrl: 'path/to/spiderman.jpg',
          description: 'The amazing',
        },
      ],
      searchText: '',
      setSearchText: jest.fn(),
      isLoading: true,
      error: null,
    });

    render(
      <AppProviderMock>
        <CharactersList />
      </AppProviderMock>
    );

    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('should display alert when as error', () => {
    const mockUseCharactersListController = useCharacterListController as jest.MockedFunction<
      typeof useCharacterListController
    >;
    mockUseCharactersListController.mockReturnValue({
      data: [
        {
          id: 1,
          name: 'Spider-Man',
          avatarUrl: 'path/to/spiderman.jpg',
          description: 'The amazing',
        },
      ],
      searchText: '',
      setSearchText: jest.fn(),
      isLoading: false,
      error: new Error('An error occurred'),
    });

    render(
      <AppProviderMock>
        <CharactersList />
      </AppProviderMock>
    );

    expect(screen.getByRole('alert')).toBeTruthy();
  });
});
