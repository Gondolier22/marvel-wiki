import { useEffect, useState } from 'react';
import { searchFavorites } from '../../../../../utils/indexedDB';
import { CharacterCardProps } from '../../../components/character-card';

export const useFavouritesController = () => {
  const [favourites, setFavourites] = useState<CharacterCardProps[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchFavourites = async () => {
      const favs = await searchFavorites(search);
      setFavourites(favs);
    };

    fetchFavourites();

    document.addEventListener('favoritesUpdated', fetchFavourites);

    return () => {
      document.removeEventListener('favoritesUpdated', fetchFavourites);
    };
  }, [search]);

  return { favourites, search, setSearch };
};
