import { FC } from 'react';
import { Character } from '../../../../../models/character';
import { Link } from 'react-router-dom';

type CharacterCardProps = Pick<Character, 'id' | 'name' | 'avatarUrl'>;

export const CharacterCard: FC<CharacterCardProps> = ({ avatarUrl, id, name }) => {
  return (
    <article className="c-character-card">
      <Link to={`/characters/${id}`}>
        <figure className="c-character-card__figure">
          <img className="c-character-card__image" src={avatarUrl} alt={`Avatar of ${name}`} />
          <figcaption className="c-character-card__caption">
            <h3 className="c-character-card__name">{name}</h3>
            <button className="c-character-card__fav-button">
              <img src="fav_off.svg" />
            </button>
          </figcaption>
        </figure>
      </Link>
    </article>
  );
};
