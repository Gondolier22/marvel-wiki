import { useEffect, useState } from 'react';
import { searchFavorites } from '../../../../../utils/indexedDB';
import { CharacterCardProps } from '../../../components/character-card';

// Hook personalizado para controlar la lógica de la página de favoritos
export const useFavouritesController = () => {
  // Estado para almacenar los personajes favoritos
  const [favourites, setFavourites] = useState<CharacterCardProps[]>([]);
  // Estado para almacenar el texto de búsqueda
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    // Función para obtener los favoritos desde la base de datos
    const fetchFavourites = async () => {
      const favs = await searchFavorites(search);
      setFavourites(favs);
    };

    fetchFavourites();

    // Agregar un listener para actualizar los favoritos cuando se modifiquen
    document.addEventListener('favoritesUpdated', fetchFavourites);

    return () => {
      // Eliminar el listener cuando el componente se desmonte
      document.removeEventListener('favoritesUpdated', fetchFavourites);
    };
  }, [search]);

  // Retornar los estados y funciones necesarias para el componente
  return { favourites, search, setSearch };
};
