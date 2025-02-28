import { FC } from 'react';
import { CharacterCard, CharacterCardProps } from './character-card';

type CharacterCardListProps = {
  cards: CharacterCardProps[];
};
export const CharacterCardList: FC<CharacterCardListProps> = ({ cards }) => {
  return (
    <div className="c-characters-list__container" role="list">
      {cards?.map((character) => (
        <CharacterCard
          key={character.id}
          avatarUrl={character.avatarUrl}
          name={character.name}
          id={character.id}
        />
      ))}
    </div>
  );
};
