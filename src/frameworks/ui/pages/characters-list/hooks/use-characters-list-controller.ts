import { useState } from 'react';
import { useGetCharactersQuery } from '../../../../tanstack-query/use-get-characters';

// Hook personalizado para controlar la lógica de la lista de personajes
export const useCharacterListController = () => {
  const [offsetState, setOffsetState] = useState(0);
  // Estado para almacenar el texto de búsqueda
  const [searchTextState, setSearchTextState] = useState('');
  // Obtener datos, error y estado de carga de la consulta de personajes
  const { data, error, isLoading } = useGetCharactersQuery({
    offset: offsetState,
    searchText: searchTextState,
  });

  // Retornar los estados y funciones necesarias para el componente
  return {
    data: data?.characters,
    error,
    isLoading,
    searchText: searchTextState,
    setSearchText: setSearchTextState,
    totalItems: data?.totalItems ?? 0,
    onNextPage: () => setOffsetState((prev) => prev + 50),
    onPrevPage: () => setOffsetState((prev) => prev - 50),
    isNextPageDisabled: (data?.totalItems ?? 0) <= offsetState + 50,
    isPrevPageDisabled: offsetState === 0,
  };
};
