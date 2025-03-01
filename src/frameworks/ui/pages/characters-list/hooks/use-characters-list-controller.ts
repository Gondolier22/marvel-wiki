import { useState } from 'react';
import { useGetCharactersQuery } from '../../../../tanstack-query/use-get-characters';

// Hook personalizado para controlar la lógica de la lista de personajes
export const useCharacterListController = () => {
  // Estado para almacenar el texto de búsqueda
  const [searchTextState, setSearchTextState] = useState('');
  // Obtener datos, error y estado de carga de la consulta de personajes
  const { data, error, isLoading } = useGetCharactersQuery(searchTextState);

  // Retornar los estados y funciones necesarias para el componente
  return {
    data,
    error,
    isLoading,
    searchText: searchTextState,
    setSearchText: setSearchTextState,
  };
};
