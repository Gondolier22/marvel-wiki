import { render, screen } from '@testing-library/react';
import CharacterDetail from '../character-detail';
import { useCharacterDetailController } from '../hooks/use-character-detail-controller';

// Mock the useCharacterDetailController hook
jest.mock('../hooks/use-character-detail-controller');

const mockUseCharacterDetailController = useCharacterDetailController as jest.MockedFunction<
  typeof useCharacterDetailController
>;

describe('CharacterDetail', () => {
  it('renders Loader when isLoading is true', () => {
    mockUseCharacterDetailController.mockReturnValue({
      detail: { avatarUrl: '', name: '', description: '', id: 0 },
      comics: [],
      containerRef: { current: null },
      isLoading: true,
      handleMouseDown: jest.fn(),
      handleMouseLeave: jest.fn(),
      handleMouseMove: jest.fn(),
      handleMouseUp: jest.fn(),
      error: false,
    });

    render(<CharacterDetail />);
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('renders character details and comics when isLoading is false', () => {
    const mockDetail = {
      id: 1,
      avatarUrl: 'http://example.com/avatar.jpg',
      name: 'Spider-Man',
      description: 'Friendly neighborhood Spider-Man',
    };
    const mockComics = [
      { id: 1, title: 'Comic 1', imageUrl: 'http://example.com/comic1.jpg', year: 2021 },
      { id: 2, title: 'Comic 2', imageUrl: 'http://example.com/comic1.jpg', year: 2020 },
    ];

    mockUseCharacterDetailController.mockReturnValue({
      detail: mockDetail,
      comics: mockComics,
      containerRef: { current: null },
      isLoading: false,
      handleMouseDown: jest.fn(),
      handleMouseLeave: jest.fn(),
      handleMouseMove: jest.fn(),
      handleMouseUp: jest.fn(),
      error: false,
    });

    render(<CharacterDetail />);
    expect(screen.getByAltText(`Avatar of ${mockDetail.name}`)).toBeTruthy();
    expect(screen.getByText(mockDetail.name)).toBeTruthy();
    expect(screen.getByText(mockDetail.description)).toBeTruthy();
    mockComics.forEach((comic) => {
      expect(screen.getByText(comic.title)).toBeTruthy();
    });
  });
});
