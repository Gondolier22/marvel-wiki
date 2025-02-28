import { useState } from 'react';
import { useGetCharactersQuery } from '../../../../tanstack-query/use-get-characters';

export const useCharacterListController = () => {
  const [searchTextState, setSearchTextState] = useState('');
  const { data, error, isLoading } = useGetCharactersQuery(searchTextState);

  return {
    data,
    error,
    isLoading,
    searchText: searchTextState,
    setSearchText: setSearchTextState,
  };
};
