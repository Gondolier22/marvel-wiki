import { FC, useRef, useState } from 'react';
import { Character } from '../../../models/character';
import { addFavorite, openDB, removeFavorite } from '../../../utils/indexedDB';
import { useEffect } from 'react';
import classNames from 'classnames';

type FavButtonProps = {
  character?: Pick<Character, 'id' | 'name' | 'avatarUrl'>;
};

export const FavButton: FC<FavButtonProps> = ({
  character = { id: 0, avatarUrl: '', name: '' },
}) => {
  const [isFav, setIsFav] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkIsFav = async () => {
      const db = await openDB();
      const transaction = db.transaction('favorites', 'readonly');
      const store = transaction.objectStore('favorites');
      const request = store.get(character.id);
      request.onsuccess = () => {
        setIsFav(!!request.result);
      };
    };

    checkIsFav();
  }, [character.id]);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const figcaption = buttonRef?.current?.closest('figcaption');
    figcaption?.addEventListener('mouseenter', handleMouseEnter);
    figcaption?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      figcaption?.removeEventListener('mouseenter', handleMouseEnter);
      figcaption?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);

  const handleFavClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFav) {
      await removeFavorite(character.id);
    } else {
      await addFavorite(character);
    }
    setIsFav(!isFav);
  };

  return (
    <button
      className={classNames(
        'c-fav-button',
        { 'c-fav-button--hover': isHovered },
        { 'c-fav-button--is-fav': isFav }
      )}
      ref={buttonRef}
      onClick={handleFavClick}
    >
      <img alt="Fav icon" />
    </button>
  );
};
