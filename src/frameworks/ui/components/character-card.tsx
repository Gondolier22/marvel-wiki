import { FC } from 'react';
import { Character } from '../../../models/character';
import { Link } from 'react-router-dom';
import { FavButton } from './fav-button';

export type CharacterCardProps = Pick<Character, 'id' | 'name' | 'avatarUrl'>;

export const CharacterCard: FC<CharacterCardProps> = ({ avatarUrl, id, name }) => {
  return (
    <article className="c-character-card" role="article">
      <Link to={`/characters/${id}`} role="link">
        <figure className="c-character-card__figure" role="figure">
          <img
            className="c-character-card__image"
            src={avatarUrl}
            alt={`Avatar of ${name}`}
            onError={(event) => {
              event.currentTarget.src = '/image_not_found.svg';
            }}
            role="img"
          />
          <figcaption className="c-character-card__caption" role="figcaption">
            <h3 className="c-character-card__name" role="heading">
              {name}
            </h3>
            <FavButton character={{ avatarUrl, id, name }} />
          </figcaption>
        </figure>
      </Link>
    </article>
  );
};
