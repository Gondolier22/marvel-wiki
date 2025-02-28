import { FC } from 'react';
import { Comic } from '../../../../../models/comic';

export const ComicCard: FC<Comic> = ({ title, year, imageUrl }) => {
  return (
    <figure className="c-character-detail__comic">
      <img src={imageUrl} alt={`Cover of ${title}`} />
      <figcaption>
        <p className="c-character-detail__comic__title">{title}</p>
        <p className="c-character-detail__comic__year">{year}</p>
      </figcaption>
    </figure>
  );
};
