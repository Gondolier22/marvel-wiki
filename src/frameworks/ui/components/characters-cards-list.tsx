import { FC } from 'react';
import { CharacterCard, CharacterCardProps } from './character-card';
import { AlertMessage } from './alert-message';

type CharacterCardListProps = {
  cards: CharacterCardProps[];
};
export const CharacterCardList: FC<CharacterCardListProps> = ({ cards }) => {
  return (
    <>
      {cards && cards.length > 0 ? (
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
      ) : (
        <AlertMessage message="No characters found" type="info" />
      )}
    </>
  );
};
