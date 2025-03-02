import { render, screen } from '@testing-library/react';
import { CharacterCardList } from '../characters-cards-list';
import { CharacterCardProps } from '../character-card';
import { AppProviderMock } from '../../../../../mocks/app-provider-mock';

describe('CharacterCardList', () => {
  const mockCards: CharacterCardProps[] = [
    { id: 1, avatarUrl: 'url1', name: 'Character 1' },
    { id: 2, avatarUrl: 'url2', name: 'Character 2' },
  ];

  it('should render without crashing', () => {
    render(
      <AppProviderMock>
        <CharacterCardList cards={mockCards} />
      </AppProviderMock>
    );
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });
});
