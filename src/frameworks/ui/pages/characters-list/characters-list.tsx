import { Loader } from '../../components/loader';
import { Searcher } from '../../components/searcher';
import { useCharacterListController } from './hooks/use-characters-list-controller';
import { CharacterCardList } from '../../components/characters-cards-list';
import { AlertMessage } from '../../components/alert-message';

// Componente para mostrar la lista de personajes
const CharactersList = () => {
  const { data, searchText, setSearchText, isLoading, error } = useCharacterListController();

  return (
    <section className="c-characters-list">
      {/* Mostrar el loader mientras se cargan los datos */}
      {isLoading && <Loader />}
      {/* Componente de búsqueda */}
      <Searcher onChange={setSearchText} value={searchText} totalResults={data?.length ?? 0} />
      {/* Mostrar la lista de personajes si no hay error y no está cargando */}
      {!isLoading && !error && (
        <CharacterCardList
          cards={data?.map(({ id, name, avatarUrl }) => ({ id, name, avatarUrl })) ?? []}
        />
      )}
      {/* Mostrar un mensaje de error si ocurre un error */}
      {error && (
        <AlertMessage
          message="An error occurred with the query, please retry refreshing the page"
          type="error"
        />
      )}
    </section>
  );
};

export default CharactersList;
