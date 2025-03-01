import { Loader } from '../../components/loader';
import { Searcher } from '../../components/searcher';
import { useCharacterListController } from './hooks/use-characters-list-controller';
import { CharacterCardList } from '../../components/characters-cards-list';
import { AlertMessage } from '../../components/alert-message';

const CharactersList = () => {
  const { data, searchText, setSearchText, isLoading, error } = useCharacterListController();

  return (
    <section className="c-characters-list">
      {isLoading && <Loader />}
      <Searcher onChange={setSearchText} value={searchText} totalResults={data?.length ?? 0} />
      {!isLoading && !error && (
        <CharacterCardList
          cards={data?.map(({ id, name, avatarUrl }) => ({ id, name, avatarUrl })) ?? []}
        />
      )}
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
